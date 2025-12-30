# Changelog

All notable changes to the BDS Schemas package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-30

### Added

- Initial release of BDS schemas v0.1
- JSON Schema definitions for all entities:
  - Author: Creator of books with handle, bio, avatar, and external links
  - Publisher: Publishing entities with metadata
  - Series: Book series with ordering and metadata
  - Book: Books with comprehensive metadata, pricing, and author references
  - Manifest: Immutable table of contents for book versions
  - Chapter: Versioned chapter content with ProseMirror JSON format
  - Reader: Users with reading preferences
  - LibraryEntry: User library entries with reading progress tracking
- JSON Schema definitions for all events:
  - Heartbeat: Reading session tracking events
  - ChapterTransition: Navigation between chapters
  - BookLifecycle: Book start/complete milestones
  - Interaction: User interactions (highlights, annotations, etc.)
  - AppLifecycle: App state changes (open, background, etc.)
  - EventBatch: Batching support for 1-100 events
- Custom validators for BDS-specific formats:
  - DIDs (Decentralized Identifiers): `did:bds:{type}:{id}[:{version}]`
  - SemVer: Semantic versioning (`major.minor.patch`)
  - ISO 8601: Date-time format
  - URL: HTTP/HTTPS URLs
  - Language codes: ISO 639-1
  - Currency codes: ISO 4217
- Auto-generated TypeScript types from JSON Schema
- Zod schemas for runtime validation
- Example data for all schemas (9 entity examples, 1 event batch example)
- Comprehensive test suite (39 tests: 31 entity tests + 8 event tests)
- Build and validation scripts:
  - `generate-from-json-schema.js`: Auto-generates TypeScript types
  - `validate-examples.js`: Validates examples against schemas
- Package exports for all schema categories (entities, events, validators)
- Comprehensive README with usage examples
