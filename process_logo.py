from PIL import Image, ImageFilter
import numpy as np

def process_image(input_path, output_path):
    # Open the image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Calculate grayscale value
    # R, G, B channels
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    gray = 0.2989 * r + 0.5870 * g + 0.1140 * b
    
    # The image has a checkerboard or white background. 
    # The signature is dark blue/black.
    # We want to isolate the signature (dark pixels).
    # Let's set a threshold. Anything darker than 150 (out of 255) is signature.
    # The checkerboard is usually light gray (e.g. 200+).
    mask = gray < 130
    
    # Create a new RGBA image
    # We want the signature to be pure black (0,0,0) and the background transparent (0,0,0,0)
    new_data = np.zeros_like(data)
    new_data[:,:,3] = mask * 255  # Alpha channel: 255 where signature, 0 elsewhere
    
    new_img = Image.fromarray(new_data)
    
    # To make it "bold", we can apply a max filter (which thickens the white mask in alpha)
    # Wait, max filter on RGBA might be tricky. Let's extract alpha, dilate it, then put it back.
    alpha = new_img.split()[3]
    # Dilation is MaxFilter
    alpha = alpha.filter(ImageFilter.MaxFilter(3)) # 3x3 kernel
    # Maybe do it twice for extra bold
    alpha = alpha.filter(ImageFilter.MaxFilter(3))
    
    new_img.putalpha(alpha)
    new_img.save(output_path)
    print("Image processed successfully.")

if __name__ == "__main__":
    process_image("signature.png.png", "signature_processed.png")
