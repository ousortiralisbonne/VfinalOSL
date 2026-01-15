import sanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function imgUrlBuilder(source: any) {
  return builder.image(source).width(800).quality(50);
}
