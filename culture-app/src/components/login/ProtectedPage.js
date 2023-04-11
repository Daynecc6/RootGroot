import { Container, Typography } from "@mui/material";

const ProtectedPage = () => {
  return (
    <Container>
      <Typography variant="h3">Protected Page</Typography>
      <Typography>
        This is a protected page. Only logged-in users can see this content.
      </Typography>
    </Container>
  );
};

export default ProtectedPage;
