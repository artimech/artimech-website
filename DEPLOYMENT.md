# Artimech Website - Cloud Run Deployment Guide

This guide will help you deploy the Artimech website to Google Cloud Run using GitHub Actions with Workload Identity Federation (secure, keyless authentication).

## Prerequisites

- Google Cloud Platform account with billing enabled
- GitHub repository with admin access
- Google Cloud CLI installed locally

## GCP Project Setup ✅ COMPLETED

**Project ID**: `artimech-website`  
**Billing Account**: Linked to Tryvinci account  
**Service Account**: `artimech-deployer@artimech-website.iam.gserviceaccount.com`

### APIs Enabled ✅
- Cloud Run API
- Artifact Registry API
- Cloud Build API
- Container Registry API

### Resources Created ✅
- **Artifact Registry**: `us-central1-docker.pkg.dev/artimech-website/artimech-website`
- **Workload Identity Pool**: `github-pool`
- **Workload Identity Provider**: `github-provider` (restricted to `artimech` organization)
- **Service Account**: `artimech-deployer` with proper IAM roles

## GitHub Secrets Configuration

You need to add these secrets to your GitHub repository at:
https://github.com/artimech/artimech-website/settings/secrets/actions

### Required Secrets:

1. **`WIF_PROVIDER`**
   ```
   projects/888261113238/locations/global/workloadIdentityPools/github-pool/providers/github-provider
   ```

2. **`WIF_SERVICE_ACCOUNT`**
   ```
   artimech-deployer@artimech-website.iam.gserviceaccount.com
   ```

## How It Works

1. **Push to main branch** triggers the GitHub Actions workflow
2. **Workload Identity Federation** authenticates GitHub Actions to GCP (no keys needed!)
3. **Docker build** creates container image from your Next.js app
4. **Artifact Registry** stores the container image
5. **Cloud Run** deploys the container with automatic scaling

## Deployment Process

### Automatic Deployment
Every push to the `main` branch automatically triggers deployment.

### Manual Deployment
You can trigger deployment manually from GitHub Actions tab.

### First Deployment
```bash
git add .
git commit -m "Deploy to Cloud Run"
git push origin main
```

## Monitoring & Management

### View Deployment Status
- GitHub Actions: https://github.com/artimech/artimech-website/actions
- Cloud Run Console: https://console.cloud.google.com/run/detail/us-central1/artimech-website/revisions?project=artimech-website

### View Logs
```bash
gcloud run services logs read artimech-website --region=us-central1 --project=artimech-website
```

### Check Service Status
```bash
gcloud run services describe artimech-website --region=us-central1 --project=artimech-website
```

## Configuration

The deployment is configured with:
- **CPU**: 1 vCPU
- **Memory**: 512Mi
- **Port**: 3000
- **Scaling**: 0-10 instances
- **Authentication**: Public (allow unauthenticated)

## Custom Domain Setup

1. **Verify domain ownership** in Google Cloud Console
2. **Map custom domain** to Cloud Run service:
   ```bash
   gcloud run domain-mappings create --service=artimech-website --domain=yourdomain.com --region=us-central1 --project=artimech-website
   ```
3. **Update DNS records** as instructed by Google Cloud

## Cost Optimization

Cloud Run pricing:
- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GiB-second
- **Requests**: $0.40 per million requests
- **Free Tier**: 2 million requests per month

Expected monthly cost for low-traffic website: **$5-15**

## Security Features

✅ **Workload Identity Federation** - No service account keys stored  
✅ **Least Privilege IAM** - Service account has minimal required permissions  
✅ **Repository Restriction** - Only `artimech` organization can deploy  
✅ **HTTPS Enforced** - All traffic encrypted in transit  
✅ **Container Security** - Non-root user, minimal base image

## Troubleshooting

### Build Failures
1. Check GitHub Actions logs
2. Verify Docker build locally:
   ```bash
   docker build -t test .
   ```

### Deployment Failures
1. Check IAM permissions
2. Verify Workload Identity Federation setup
3. Check Cloud Run service logs

### Runtime Errors
1. Check Cloud Run logs in GCP Console
2. Verify environment variables
3. Test container locally:
   ```bash
   docker run -p 3000:3000 test
   ```

## Support

- **GitHub Issues**: https://github.com/artimech/artimech-website/issues
- **Cloud Run Documentation**: https://cloud.google.com/run/docs
- **Next.js Documentation**: https://nextjs.org/docs

---

**Note**: This setup uses Workload Identity Federation for enhanced security. No service account keys are stored in GitHub, making it much more secure than traditional approaches. 