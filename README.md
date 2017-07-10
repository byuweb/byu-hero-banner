# byu-hero-banner

This is a simple Hero Image Banner Component using the BYU Web Community web component
tools.

# Getting Started

The hero component has three slots and an image-source attribute. We could have used a slot for the image, but using an image-source attribute allows us to set the image as a CSS background image, which is more flexible than an img tag due to IE and Edge not supporting the "object-fit" property, among other things.

To use the component on your site, use the following markup:

    <byu-hero-banner id="hero" image-source="dark-image.jpg" class="side-image">
        <span slot="headline">This is the Headline</span>
        <span slot="intro-text">This is the intro text. I'm going to add more words here so it's not so short, resulting in a longer piece of intro text.</span>
        <a slot="read-more" href="http://www.google.com">Custom "Read More" Text</a>
    </byu-hero-banner>

