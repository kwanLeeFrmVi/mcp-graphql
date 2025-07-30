# mcp-graphql

[![smithery badge](https://smithery.ai/badge/mcp-graphql)](https://smithery.ai/server/mcp-graphql)

A Model Context Protocol server that enables LLMs to interact with GraphQL APIs. This implementation provides schema introspection and query execution capabilities, allowing models to discover and use GraphQL APIs dynamically.

<a href="https://glama.ai/mcp/servers/4zwa4l8utf"><img width="380" height="200" src="https://glama.ai/mcp/servers/4zwa4l8utf/badge" alt="mcp-graphql MCP server" /></a>

## Usage

Run `mcp-graphql` with the correct endpoint, it will automatically try to introspect your queries.

### Environment Variables (Breaking change in 1.0.0)

> **Note:** As of version 1.0.0, command line arguments have been replaced with environment variables.

| Environment Variable | Description | Default |
|----------|-------------|---------|
| `ENDPOINT` | GraphQL endpoint URL | `http://localhost:4000/graphql` |
| `HEADERS` | JSON string containing headers for requests | `{}` |
| `ALLOW_MUTATIONS` | Enable mutation operations (disabled by default) | `false` |
| `NAME` | Name of the MCP server | `mcp-graphql` |
| `SCHEMA` | Path to a local GraphQL schema file (optional) | - |

### Examples

```bash
# Basic usage with a local GraphQL server
ENDPOINT=http://localhost:3000/graphql npx mcp-graphql

# Using with custom headers
ENDPOINT=https://api.example.com/graphql HEADERS='{"Authorization":"Bearer token123"}' npx mcp-graphql

# Enable mutation operations
ENDPOINT=http://localhost:3000/graphql ALLOW_MUTATIONS=true npx mcp-graphql

# Using a local schema file instead of introspection
ENDPOINT=http://localhost:3000/graphql SCHEMA=./schema.graphql npx mcp-graphql
```

### Running via npx or bunx directly from GitHub

You can also invoke this package via npx (or bunx) directly from the GitHub repository without publishing to npm:

```bash
# Using the SSH URL
npx git+ssh://git@github.com/kwanLeeFrmVi/mcp-graphql.git [<args>…]
# Using the HTTPS URL
npx git+https://github.com/kwanLeeFrmVi/mcp-graphql.git [<args>…]
# Using GitHub SSH shorthand
npx github:kwanLeeFrmVi/mcp-graphql [<args>…]
# Using GitHub HTTPS shorthand (specify branch or tag)
npx github:kwanLeeFrmVi/mcp-graphql#main [<args>…]
```
> **bunx note:** Bun’s remote invocation does not run the `prepare`/build step, so the binary may not be generated when calling via `bunx github:…`. If you see “could not determine executable to run for package,” use the manual clone/build workflow or invoke with `npx` instead (which runs the `prepare` hook).
> **Note:** Because this repository does not ship pre-built `dist/` files, the bin executable won’t exist until the code is compiled.
> A `prepare` script is now included (requires Bun or a compatible Node toolchain) to build on-the-fly. If you see “command not found” for `mcp-graphql`, either install Bun so the hook runs successfully, or clone & build manually:

```bash
git clone git@github.com/kwanLeeFrmVi/mcp-graphql.git
cd mcp-graphql
npm install       # or bun install
npm run build
npx mcp-graphql [<args>…]
```

## Resources

- **graphql-schema**: The server exposes the GraphQL schema as a resource that clients can access. This is either the local schema file or based on an introspection query.

## Available Tools

The server provides two main tools:

1. **introspect-schema**: Retrieve the GraphQL schema using either the local schema file or an introspection query.
   You can pass an optional `headers` argument (a JSON object) to include additional HTTP headers for this request.

2. **query-graphql**: Execute GraphQL queries against the endpoint. By default, mutations are disabled unless `ALLOW_MUTATIONS` is set to `true`.
   You can pass an optional `headers` argument (a JSON object) to include additional HTTP headers for this request.

3. **mutation-graphql**: Execute GraphQL mutation operations against the endpoint. Requires `ALLOW_MUTATIONS` to be enabled.
   You can pass an optional `headers` argument (a JSON object) to include additional HTTP headers for this request.

## Installation

### Installing via Smithery

To install GraphQL MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-graphql):

```bash
npx -y @smithery/cli install mcp-graphql --client claude
```

### Installing Manually

It can be manually installed to Claude:
```json
{
    "mcpServers": {
        "mcp-graphql": {
            "command": "npx",
            "args": ["mcp-graphql"],
            "env": {
                "ENDPOINT": "http://localhost:3000/graphql"
            }
        }
    }
}
```

## Security Considerations

Mutations are disabled by default as a security measure to prevent an LLM from modifying your database or service data. Consider carefully before enabling mutations in production environments.

## Customize for your own server

This is a very generic implementation where it allows for complete introspection and for your users to do whatever (including mutations). If you need a more specific implementation I'd suggest to just create your own MCP and lock down tool calling for clients to only input specific query fields and/or variables. You can use this as a reference.
