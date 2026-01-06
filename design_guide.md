# Artimech Design Guide

This document outlines the core design tokens (typography and colors) used in the Artimech website.

## Typography

The site uses a single monospaced font family for a technical, engineering-focused aesthetic.

### Primary Font
- **Family**: `JetBrains Mono`
- **Source**: Google Fonts (via `next/font/google`)
- **Weights Used**: 200, 300, 400 (Regular), 500, 600, 700 (Bold), 800
- **Variable**: `--font-jetbrains-mono`
- **Fallbacks**: Standard system monospace fonts.

## Color System

The site implements a **Light** and **Dark** mode system using Tailwind CSS `neutral` palette and custom variables for code syntax highlighting.

### Base Interface
| Element | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Background** | White (`#ffffff`) | Black (`#000000`) |
| **Text** | Black (`#000000`) | White (`#ffffff`) |
| **Selection** | Bg: `#47a3f3`, Text: `#fefefe` | *Same* |

### Neutral Palette (Tailwind Defaults)
Used for secondary text, borders, and subtle backgrounds.
- `neutral-50` to `neutral-900`

### Syntax Highlighting (Code Blocks)
Custom semantic colors defined for code snippets.

**Light Mode**
- Class: `#2d5e9d`
- Identifier: `#354150`
- Keyword: `#e02518`
- String: `#007f7a`
- Comment: `#a19595`
- JSX Literals: `#6266d1`
- Property/Entity: `#e25a1c`

**Dark Mode**
- Class: `#4c97f8`
- Identifier: `white`
- Keyword: `#f47067`
- String: `#0fa295`
