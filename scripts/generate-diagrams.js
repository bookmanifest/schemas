#!/usr/bin/env node

/**
 * Generate Mermaid diagrams from JSON Schemas
 *
 * Generates:
 * - Individual class diagrams for each entity
 * - Entity Relationship Diagram (ERD) showing relationships
 * - Event hierarchy diagram
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const SCHEMAS_DIR = path.join(ROOT_DIR, 'v0.3/json-schema')
const ENTITIES_DIR = path.join(SCHEMAS_DIR, 'entities')
const EVENTS_DIR = path.join(SCHEMAS_DIR, 'events')
const OUTPUT_DIR = path.join(ROOT_DIR, 'docs/diagrams')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

/**
 * Convert JSON Schema type to Mermaid type
 */
function toMermaidType(jsonSchema) {
  if (!jsonSchema) return 'any'

  if (jsonSchema.type === 'string') {
    if (jsonSchema.format) return `string (${jsonSchema.format})`
    if (jsonSchema.enum) return `enum: ${jsonSchema.enum.join(' | ')}`
    return 'string'
  }

  if (jsonSchema.type === 'integer' || jsonSchema.type === 'number') {
    if (jsonSchema.minimum !== undefined || jsonSchema.maximum !== undefined) {
      const min = jsonSchema.minimum ?? '-∞'
      const max = jsonSchema.maximum ?? '∞'
      return `number [${min}, ${max}]`
    }
    return 'number'
  }

  if (jsonSchema.type === 'boolean') return 'boolean'
  if (jsonSchema.type === 'array') {
    const itemType = jsonSchema.items ? toMermaidType(jsonSchema.items) : 'any'
    return `${itemType}[]`
  }

  if (jsonSchema.$ref) {
    const ref = jsonSchema.$ref.split('/').pop().replace('.json', '')
    return ref
  }

  if (jsonSchema.type === 'object') return 'object'

  return 'any'
}

/**
 * Check if a ref is to a validator (primitive type)
 */
function isValidatorRef(ref) {
  const validators = ['did', 'url', 'iso8601', 'semver', 'index']
  const name = ref.split('/').pop().replace('.json', '')
  return validators.includes(name)
}

/**
 * Extract relationships from schema (entity to entity only)
 */
function extractRelationships(schema, entityName, allEntities) {
  const relationships = []

  if (!schema.properties) return relationships

  for (const [propName, propSchema] of Object.entries(schema.properties)) {
    if (propSchema.$ref) {
      const ref = propSchema.$ref.split('/').pop().replace('.json', '')

      // Skip validators/primitive types
      if (isValidatorRef(propSchema.$ref)) continue

      const isRequired = schema.required?.includes(propName)
      const cardinality = propSchema.type === 'array'
        ? (isRequired ? '"1..*" ' : '"0..*" ')
        : (isRequired ? '"1" ' : '"0..1" ')

      relationships.push({
        from: entityName,
        to: ref,
        fromLabel: propName,
        cardinality: cardinality
      })
    }

    // Check nested objects
    if (propSchema.type === 'object' && propSchema.properties) {
      for (const [nestedProp, nestedSchema] of Object.entries(propSchema.properties)) {
        if (nestedSchema.$ref) {
          const ref = nestedSchema.$ref.split('/').pop().replace('.json', '')

          // Skip validators/primitive types
          if (isValidatorRef(nestedSchema.$ref)) continue

          relationships.push({
            from: entityName,
            to: ref,
            fromLabel: `${propName}.${nestedProp}`,
            cardinality: '"0..1" '
          })
        }
      }
    }
  }

  return relationships
}

/**
 * Generate Mermaid class diagram for a single entity
 */
function generateClassDiagram(schema, entityName) {
  const title = schema.title || entityName
  const description = schema.description || ''

  let diagram = `classDiagram\n`
  diagram += `    class ${entityName} {\n`
  diagram += `        <<${title}>>\n`

  if (description) {
    diagram += `        -- Properties --\n`
  }

  if (schema.properties) {
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const required = schema.required?.includes(propName) ? ' ✗' : ''
      const type = toMermaidType(propSchema)
      diagram += `        +${propName}${required} : ${type}\n`
    }
  }

  diagram += `    }\n`

  return diagram
}

/**
 * Generate Mermaid ER diagram for all entities
 */
function generateERDiagram(entities) {
  let diagram = `erDiagram\n`

  for (const [name, schema] of Object.entries(entities)) {
    const title = schema.title || name
    diagram += `    ${name} {\n`
    diagram += `        string ${title}\n`

    if (schema.properties) {
      const props = Object.entries(schema.properties).slice(0, 5)
      for (const [propName, propSchema] of props) {
        const type = propSchema.type || 'any'
        const required = schema.required?.includes(propName) ? '' : 'optional '
        diagram += `        ${required}${type} ${propName}\n`
      }
      if (Object.keys(schema.properties).length > 5) {
        diagram += `        ... more ...\n`
      }
    }

    diagram += `    }\n`
  }

  return diagram
}

/**
 * Generate architecture diagram showing DID-based connections
 */
function generateArchitectureDiagram(entities) {
  let diagram = `flowchart LR\n`
  diagram += `    %% Book Manifest Architecture - DID-based References\n\n`

  // Define all entities
  const entityList = Object.keys(entities).filter(e => e !== 'prosemirror')
  for (const name of entityList) {
    const title = entities[name].title || name
    diagram += `    ${name.replace(/-/g, '_')}[\"${title}\\n(${name})\"]\n`
  }

  diagram += `\n    %% Relationships via DIDs\n`

  // Book has author_ids (array)
  diagram += `    book -->|\"author_ids[]\"| author\n`

  // Book has publisher_id (optional)
  diagram += `    book -->|\"publisher_id\"| publisher\n`

  // Book has series_id (optional)
  diagram += `    book -->|\"series_id\"| series\n`

  // Book has latest_manifest_id
  diagram += `    book -->|\"latest_manifest_id\"| manifest\n`

  // Manifest has chapters (array)
  diagram += `    manifest -->|\"chapters[]\"| chapter\n`

  // LibraryEntry connects reader and book
  diagram += `    library_entry -->|\"reader_id\"| reader\n`
  diagram += `    library_entry -->|\"book_id\"| book\n`

  return diagram
}

/**
 * Extract event type from schema (handles allOf pattern)
 */
function extractEventType(name, schema) {
  // Events that extend envelope using allOf
  if (schema.allOf) {
    for (const item of schema.allOf) {
      if (item.properties?.type?.const) {
        return {
          name: name,
          title: schema.title || name,
          type: item.properties.type.const
        }
      }
    }
  }

  // Events with direct type property
  if (schema.properties?.type?.const) {
    return {
      name: name,
      title: schema.title || name,
      type: schema.properties.type.const
    }
  }

  return null
}

/**
 * Generate event hierarchy diagram
 */
function generateEventDiagram(events) {
  let diagram = `flowchart TD\n`
  diagram += `    %% Book Manifest Event Hierarchy\n\n`
  diagram += `    Envelope[\"Event Envelope\\nCommon fields of identified events\"]\n`
  diagram += `    AnonymousEnvelope[\"Anonymous Event Envelope\\nNo reader_id, no session_id\"]\n\n`

  const eventTypes = []

  for (const [name, schema] of Object.entries(events)) {
    if (name.startsWith('envelope') || name === 'batch') continue

    const eventInfo = extractEventType(name, schema)
    if (eventInfo) {
      eventTypes.push(eventInfo)
      const parent = schema.allOf?.[0]?.$ref === './envelope-anonymous.json' ? 'AnonymousEnvelope' : 'Envelope'
      diagram += `    ${parent} -->|"extends\"| ${name.replace(/-/g, '_')}[\"${eventInfo.title}\\ntype: ${eventInfo.type}\"]\n`
    }
  }

  // Add descriptions
  if (eventTypes.length > 0) {
    diagram += `\n    %% Event Types\n`
    for (const evt of eventTypes) {
      const schema = events[evt.name]
      if (schema.description) {
        diagram += `    %% ${evt.name}: ${schema.description}\n`
      }
    }
  }

  return diagram
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Generating Mermaid diagrams from JSON Schemas...\n')

  // Load entity schemas
  console.log('📁 Loading entity schemas...')
  const entities = {}
  const entityFiles = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'))

  for (const file of entityFiles) {
    const name = path.basename(file, '.json')
    const schema = JSON.parse(fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf-8'))
    entities[name] = schema
  }

  console.log(`   ✓ Loaded ${Object.keys(entities).length} entity schemas\n`)

  // Load event schemas
  console.log('📁 Loading event schemas...')
  const events = {}
  const eventFiles = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.json'))

  for (const file of eventFiles) {
    const name = path.basename(file, '.json')
    const schema = JSON.parse(fs.readFileSync(path.join(EVENTS_DIR, file), 'utf-8'))
    events[name] = schema
  }

  console.log(`   ✓ Loaded ${Object.keys(events).length} event schemas\n`)

  // Generate individual class diagrams
  console.log('📊 Generating class diagrams...')
  for (const [name, schema] of Object.entries(entities)) {
    const diagram = generateClassDiagram(schema, name)
    const fileName = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    fs.writeFileSync(path.join(OUTPUT_DIR, `${fileName}.mmd`), diagram)
    console.log(`   ✓ ${name}`)
  }

  // Generate ER diagram
  console.log('\n📊 Generating ER diagram...')
  const erd = generateERDiagram(entities)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'entity-relationships.mmd'), erd)
  console.log('   ✓ entity-relationships.mmd')

  // Generate architecture diagram
  console.log('\n📊 Generating architecture diagram...')
  const archDiagram = generateArchitectureDiagram(entities)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'architecture.mmd'), archDiagram)
  console.log('   ✓ architecture.mmd')

  // Generate event hierarchy
  console.log('\n📊 Generating event hierarchy diagram...')
  const eventDiagram = generateEventDiagram(events)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'event-hierarchy.mmd'), eventDiagram)
  console.log('   ✓ event-hierarchy.mmd')

  console.log(`\n✨ Done! Diagrams saved to: ${OUTPUT_DIR}\n`)

  console.log('To render diagrams:')
  console.log('  1. Online: https://mermaid.live/')
  console.log('  2. CLI: npm install -g @mermaid-js/mermaid-cli')
  console.log('     mmdc -i docs/diagrams/*.mmd -o docs/diagrams/')
}

main().catch(console.error)
