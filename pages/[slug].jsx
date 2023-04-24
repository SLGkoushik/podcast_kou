import { useRouter } from 'next/router';


export default function Podcast({ podcast }) {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug)

  return (
    <div>
        <p>{slug}</p>
      {/* ... other podcast information */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
    },
  };
}
