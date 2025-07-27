# Wedding NFT Metadata Setup

## Quick Start

1. **Your image is ready**: `WeddingNFT.png` is already in `/public/images/`

2. **Update the metadata file** (`wedding-nft.json`):

   - Replace `YOUR_USERNAME` with your GitHub username
   - Replace `YOUR_REPO` with your repository name
   - Customize the `name`, `description`, and `attributes` if desired

3. **Update `/utils/utils.ts`**:

   - Replace `YOUR_USERNAME` and `YOUR_REPO` in the WEDDING_NFT_URI
   - The function will always return your wedding NFT metadata (no randomization)

4. **Commit and push to GitHub**:

   ```bash
   git add public/ utils/utils.ts components/MintButton.tsx pages/api/mintNft.ts
   git commit -m "Add wedding NFT metadata"
   git push origin main
   ```

5. **Test your URL**:
   Your metadata will be available at:
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/public/metadata/wedding-nft.json
   ```

## Your NFT Details

- **Name**: Wedding Celebration NFT
- **Symbol**: WEDDING
- **Image**: WeddingNFT.png
- **Minting**: Every mint will create the same wedding NFT (no randomization)

## Metadata Structure

Your `wedding-nft.json` follows this structure:

```json
{
  "name": "Wedding Celebration NFT",
  "symbol": "WEDDING",
  "description": "A commemorative NFT celebrating a special wedding day",
  "image": "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/public/images/WeddingNFT.png",
  "attributes": [
    {
      "trait_type": "Occasion",
      "value": "Wedding"
    }
  ]
}
```
