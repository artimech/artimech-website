#!/bin/bash

echo "🚀 Migrating Artimech repository to organization..."

# Step 1: Create organization (manual step)
echo "📋 Step 1: Create organization 'artimech' at https://github.com/settings/organizations"
echo "   - Click 'New organization'"
echo "   - Choose free plan"
echo "   - Organization name: artimech"
echo "   - Contact email: your email"
echo ""

# Step 2: Wait for user confirmation
read -p "✅ Have you created the 'artimech' organization? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please create the organization first, then run this script again."
    exit 1
fi

# Step 3: Create repository in organization (you'll need to do this via API or web)
echo "📋 Step 2: Creating repository under artimech organization..."
echo "   You can either:"
echo "   A) Go to https://github.com/organizations/artimech/repositories/new"
echo "   B) Or wait for the next step if you have GitHub CLI"
echo ""

# Step 4: Update remote URL
echo "🔄 Step 3: Updating remote URL..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/artimech/artimech-website.git

# Step 5: Push to new repository
echo "📤 Step 4: Pushing to new organization repository..."
echo "   After creating the repo in the org, run:"
echo "   git push -u origin main"

echo ""
echo "🎉 Migration setup complete!"
echo "📍 New repository URL: https://github.com/artimech/artimech-website"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Update GitHub secrets in the new repo for Cloud Run deployment"
echo "   2. Delete the old repository: https://github.com/sdntsng/artimech-website" 