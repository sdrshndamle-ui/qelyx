# Image Optimization Note

## Founder Image Optimization Required

The `Founder Image.PNG` file is currently **1.4 MB**, which is too large for web use.

### Recommended Actions:

1. **Compress the image** using an online tool like:
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)
   - ImageOptim (https://imageoptim.com/)

2. **Target size**: Reduce to **<200 KB** while maintaining quality

3. **Optional: Convert to WebP format** for better compression:
   - WebP typically provides 25-35% better compression than PNG
   - Modern browsers support WebP natively
   - Add fallback for older browsers if needed

4. **After optimization**:
   - Replace `frontend/src/assets/Founder Image.PNG` with the optimized version
   - Update import in `TeamPage.jsx` if filename changes

### Current Status:
- File: `frontend/src/assets/Founder Image.PNG`
- Size: 1,395.19 KB (1.4 MB)
- Target: <200 KB

### Build Impact:
- Current build includes 1.4 MB image
- Optimized version would reduce bundle size significantly
- Improves page load time, especially on mobile networks

