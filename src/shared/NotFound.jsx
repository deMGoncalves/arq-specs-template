import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";

function NotFound() {
  return (
    <Box className="app-surface">
      <main className="not-found">
        <Flex direction="column" gap="4" align="center">
          <Heading size="8">Página não encontrada</Heading>
          <Text size="3" color="gray" align="center" style={{ maxWidth: "420px" }}>
            O caminho acessado não corresponde a nenhum capítulo registrado neste blueprint.
          </Text>
          <Button asChild color="iris">
            <Link to="/">Voltar para o dashboard</Link>
          </Button>
        </Flex>
      </main>
    </Box>
  );
}

export default NotFound;
