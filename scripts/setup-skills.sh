#!/usr/bin/env bash
set -euo pipefail

echo "=== Installing Agent Skills ==="
echo ""

# Install all agent skills from the Vercel Labs skill package
# This includes Clerk skills, design skills, and more
echo "Installing skills from vercel-labs/agent-skills..."
npx skills add vercel-labs/agent-skills

echo ""
echo "Installation complete!"
echo ""
echo "Skills are installed to:"
echo "  - Project: .agents/skills/ (this repo)"
echo "  - Global:  ~/.config/opencode/skills/"
echo ""
echo "Restart opencode for the new skills to take effect."
