import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <Image
      priority
      className="center"
      src={'/404-not-found.jpg'}
      alt="Image of a 404 error with a picture of an astronaut"
      height={500}
      width={500}
    />
  );
};

export default NotFoundPage;
