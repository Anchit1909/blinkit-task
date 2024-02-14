import Image from "next/image";

interface GalleryProps {
  media: any[];
}

const Gallery: React.FC<GalleryProps> = ({ media }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {media?.map((image) => {
        return (
          <div className="images">
            <Image
              src={image?.mediaUrl}
              alt=""
              width={300}
              height={300}
              className="h-auto max-w-full rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
