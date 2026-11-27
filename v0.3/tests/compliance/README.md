# Book Manifest Compliance Test Suite

This test suite verifies that implementations correctly validate Book Manifest data.

## Purpose

Any Book Manifest-compatible implementation (backend, reader app, etc.) should:

1. Accept all examples in `examples/entities/*-valid.json`
2. Reject all examples in `examples/entities/*-invalid.json`
3. Accept all examples in `examples/events/*-valid.json`
4. Reject all examples in `examples/events/*-invalid.json`

## Running Compliance Tests

```bash
npm test compliance
```

## For Implementers

Copy these tests to your implementation and adapt them to your validation library.
All valid examples MUST pass. All invalid examples MUST fail.
