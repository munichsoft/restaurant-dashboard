import { useEffect } from 'react';
import { useRouter } from 'next/router';

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null; // Or a loading indicator
}

export default IndexPage;
