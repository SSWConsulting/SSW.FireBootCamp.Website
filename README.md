# SSW FireBootCamp Website

The official website for SSW FireBootCamp - a 12-week intensive fullstack developer training program that transforms aspiring developers into industry-ready professionals.

This website is built with [Next.js](https://nextjs.org) and powered by [TinaCMS](https://app.tina.io) for content management, allowing the team to visually edit content directly from the browser.

### Features

- **Next.js 15** with React 18 and TypeScript
- **TinaCMS** for visual content editing and management
- **Tailwind CSS 4** for styling with custom FireBootCamp components
- **GitHub Pages** deployment support
- Custom components for program features (hero, skills, pricing, team, testimonials, FAQs)
- Responsive design with modern UI components (Radix UI, Motion animations)
- Mermaid diagram support for technical content

## Requirements

- Git
- [Node.js Active LTS](https://nodejs.org/en/about/releases/)
- [pnpm](https://pnpm.io) package manager
- A [TinaCMS](https://app.tina.io) account for live editing

## Local Development

Install the project's dependencies:

> [!NOTE]  
> [Do you know the best package manager for Node.js?](https://www.ssw.com.au/rules/best-package-manager-for-node/) Using the right package manager can greatly enhance your development workflow. We recommend using pnpm for its speed and efficient handling of dependencies. Learn more about why pnpm might be the best choice for your projects by checking out this rule from SSW.


```
pnpm install
```

Run the project locally:

```
pnpm dev
```

### Local URLs

- http://localhost:3000 - Browse the FireBootCamp website
- http://localhost:3000/admin - Connect to Tina Cloud and enter edit mode
- http://localhost:3000/exit-admin - Log out of Tina Cloud
- http://localhost:4001/altair/ - GraphQL playground to test queries and browse the API documentation

## Deployment

### GitHub Pages

This site can be deployed to GitHub Pages as a static site. To set up deployment:

1. In your repository settings, ensure GitHub Pages is enabled and set to deploy from the `gh-pages` branch
2. Set up a GitHub Actions workflow (if not already present) to handle the build and deployment process
3. Configure the required secrets in Settings | Secrets and variables | Actions:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `NEXT_PUBLIC_TINA_BRANCH` (optional, defaults to main)

> [!NOTE]
> Get your TinaCMS credentials from your [TinaCloud project](https://app.tina.io) - [read the docs](https://tina.io/docs/tina-cloud/deployment-options/github-pages)

> [!IMPORTANT]
> GitHub Pages does not support server-side code, so this will run as a static site. Ensure your Next.js configuration is set up for static export.

### Building Locally (Using the hosted content API)

Create a `.env` file in the root directory with your TinaCMS credentials:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
pnpm build
```

For local development without Tina Cloud:

```bash
pnpm build-local
```

## Getting Help

To get help with any TinaCMS challenges you may have:

- Visit the [documentation](https://tina.io/docs/) to learn about Tina.
- [Join our Discord](https://discord.gg/zumN63Ybpf) to share feedback.
- Visit the [community forum](https://community.tinacms.org/) to ask questions.
- Get support through the chat widget on the TinaCMS Dashboard
- [Email us](mailto:support@tina.io) to schedule a call with our team and share more about your context and what you're trying to achieve.
- [Search or open an issue](https://github.com/tinacms/tinacms/issues) if something is not working.
- Reach out on Twitter at [@tina_cms](https://twitter.com/tina_cms).

## Development

### Code Quality

This project uses [Biome](https://biomejs.dev) for linting and formatting:

```bash
pnpm lint
```

### TypeScript

TypeScript types are auto-generated from the TinaCMS schema. These are rebuilt automatically when your `tina` configuration changes.

### Visual Studio Code

[Install the GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) to benefit from type auto-completion and GraphQL syntax highlighting.

### Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components including FireBootCamp-specific blocks
- `content/` - Markdown and JSON content files managed by TinaCMS
- `tina/` - TinaCMS configuration and schema definitions
- `public/` - Static assets (images, videos, etc.)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: TinaCMS
- **UI Components**: Radix UI, Headless UI
- **Animations**: Motion (Framer Motion)
- **Code Highlighting**: Shiki
- **Diagrams**: Mermaid
- **Package Manager**: pnpm

## LICENSE

Licensed under the [Apache 2.0 license](./LICENSE).

