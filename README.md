# byu-hero-banner

This is a simple Hero Image Banner Component using the BYU Web Community web component
tools.

# Getting Started

The hero component has three slots and an image-source attribute. We could have used a slot for the image, but using an image-source attribute allows us to set the image as a CSS background image, which is more flexible than an img tag due to IE and Edge not supporting the "object-fit" property, among other things.

To use the component on your site, use the following markup:

    <link href="https://cdn.byu.edu/byu-hero-banner/latest/byu-hero-banner.min.css" rel="stylesheet" />
    <script async src="https://cdn.byu.edu/byu-hero-banner/latest/byu-hero-banner.min.js"></script>
    <byu-hero-banner id="hero" image-source="dark-image.jpg" class="side-image" alt-text="building at sunset">
        <span slot="headline">This is the Headline</span>
        <span slot="intro-text">This is the intro text. I'm going to add more words here so it's not so short, resulting in a longer piece of intro text.</span>
        <a slot="read-more" href="http://www.google.com">Custom "Read More" Text</a>
    </byu-hero-banner>

As of this writing there are 3 different layout options for the banner, with example images for each one in the /specs folder of this repository. You can switch between the different layout options by adding a different css class to the byu-hero-banner component. 

# Accessibility

A note on accessibility - while this component allows you to set an alt-text attribute, many of the layouts rely on CSS backgrounds or embedded videos. In these cases the alt text is set on a hidden image tag that's not displayed. As a result, for accessibility purposed we strongly recommend not putting informational material in the image itself, but instead in the headline, intro text, etc. 

# Side Image

The side image layout features a 616x414 image to the left of the text. The text and image are vertically centered. In phone sizes the image moves to the top and the text is shown below it.

This layout is applied by adding the side-image css class to the component. There is no `max-width` because it is mean to be used within a containing div.

## Side Image:  Style 2
This layout uses video-friendly image dimensions (9:16 ratio), starting at 570px by 320px. Rather than having the image and text vertically centered, it is top-aligned for a clean edge.
It has a smaller heading title as well, and adapts to mobile and tablet sizes responsively.
 
### Video Support
It is fully compatible with video support: simply provide the video-source attribute as well as the image-source attribute. Do not add the 'video-hero' class, as that is a different video style and conflicts.
 
## Side Image Left Alignment Layout
If you want the Side Image layout but you don't want it centered, add the class 'left-aligned' to the byu-hero-banner element. Then your side-image layout will be left-aligned.
This can be helpful if you have a constrained-page layout and want this image hero to lign up on the left side with content above or below it.

# Transparent Overlay

This hero option puts the text in a transparent overlay that sits on the left side of the image. Future releases will allow moving this overlay to the right or bottom-center of the image. In tablet and phone sizes the overlay moves to the bottom of the image.

This layout is applied by adding the transparent-overlay css class to the component.

# Full Screen

The full screen layout has two options, depending on whether your image is mostly dark or mostly light. The text is centered on the image in all screen sizes.

This layout is applied by adding the "full-screen dark-image" or "full-screen light-image" css class to the component. 

Note that the dark-image option uses white text and does not have an overlay, so in order to make your banner readable and accessible you'll need to make sure the background image is dark enough to provide sufficient contrast with the text.

# No Overlay Option
If you are concerned about ensuring accessibility with overlays or prefer a text-to-the-side layout, this is a good option for you.
Add the class 'no-overlay' to your byu-hero-banner component.

# Read More Link Style
If you prefer a standard royal-blue link to the button style, add the class 'no-button' to whatever you are passing into that slot.

# Release Roadmap

Planned additions to this component are as follows:

V1.1: 
- Allow users to choose right, left, or center positioning for the transparent overlay layout.
- Allow setting a focal point for the image and having the component center on that point in smaller screen sizes.

V1.2:
- Allow users to specify a video URL to embed YouTube videos
