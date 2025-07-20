# DEPLOY FIXED VERSION

## The Issue:

- Links pointing to development URLs instead of production
- Missing web.config for SPA routing

## The Fix:

- Added `base: "/"` to vite.config.ts
- Rebuilt with correct base URL
- Added web.config for Azure SPA routing

## Deploy Commands:

```bash
cd dist/spa
zip -r ../../saintsal-fixed.zip .
cd ../..

az webapp deploy \
  --resource-group saintvisionai-production-rg \
  --name saintvisionai-production \
  --src-path ./saintsal-fixed.zip \
  --type zip
```

This will fix all the button navigation!
