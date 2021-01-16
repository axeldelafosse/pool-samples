import styled from 'styled-components';

import Button from '@/components/button';
import { Box } from '@/components/styles-web';
import SEO from '@/utils/seo';

const Text = styled.p`
  text-align: center;
`;

function Error({ statusCode }) {
  return (
    <>
      <SEO />
      <Text>
        Oops!
        {statusCode
          ? ` An error ${statusCode} occurred on server.`
          : ' An error occurred on client.'}
      </Text>
      <Box
        maxWidth={['100%', '500px']}
        mb={15}
        ml={[15, 'auto']}
        mr={[15, 'auto']}
      >
        <Button
          variant="pink"
          width="100%"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </Box>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
