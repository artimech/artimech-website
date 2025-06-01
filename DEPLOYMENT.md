# Artimech - Deployment Guide

This guide walks you through deploying the Artimech website to Google Cloud Run using GitHub Actions.

## Prerequisites

1. **Google Cloud Project**: You need a Google Cloud project with billing enabled
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Google Cloud CLI**: Install `gcloud` CLI for local setup

## Setup Steps

### 1. Google Cloud Setup

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create Artifact Registry repository
gcloud artifacts repositories create artimech-website \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repository for Artimech website"
```

### 2. Service Account Setup

```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions" \
    --display-name="GitHub Actions"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"

# Generate service account key
gcloud iam service-accounts keys create github-actions-key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

### 3. GitHub Secrets Setup

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add these secrets:

- `GCP_PROJECT_ID`: Your Google Cloud project ID
- `GCP_SA_KEY`: Contents of the `github-actions-key.json` file (copy the entire JSON)

### 4. Deploy

1. Push your code to the `main` branch
2. GitHub Actions will automatically:
   - Build the Docker image
   - Push it to Google Artifact Registry
   - Deploy it to Cloud Run

### 5. Access Your Website

After deployment, you'll get a Cloud Run URL like:
```
https://artimech-website-xxxxx-uc.a.run.app
```

## Custom Domain Setup (Optional)

To use your own domain:

1. **Map domain in Cloud Run**:
   ```bash
   gcloud run domain-mappings create \
       --service=artimech-website \
       --domain=yourdomain.com \
       --region=us-central1
   ```

2. **Update DNS**: Add the provided DNS records to your domain registrar

## Environment Variables

If you need environment variables, add them to the GitHub Actions workflow or Cloud Run service:

```bash
gcloud run services update artimech-website \
    --set-env-vars="NODE_ENV=production" \
    --region=us-central1
```

## Monitoring

- **Logs**: `gcloud run logs read --service=artimech-website --region=us-central1`
- **Metrics**: Check the Cloud Run console for performance metrics

## Cost Optimization

Cloud Run only charges for actual usage:
- First 2 million requests per month are free
- CPU allocation: 1 vCPU (adjust based on needs)
- Memory: 512 MiB (adjust based on needs)
- Max instances: 100 (can be reduced to control costs)

## Troubleshooting

1. **Build failures**: Check GitHub Actions logs
2. **Runtime errors**: Check Cloud Run logs
3. **Permission issues**: Verify service account permissions
4. **Domain issues**: Verify DNS settings

## Security Notes

- Service account key is sensitive - keep it secure
- Enable Cloud Armor for DDoS protection if needed
- Use HTTPS-only (enabled by default on Cloud Run) 