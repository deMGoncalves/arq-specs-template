import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

function StructuralWorkspace() {
  return (
    <Box className="app-surface">
      <main className="chapter-page">
        <Flex direction="column" gap="5">
          <Heading size="8">Workspace C4</Heading>
          <Text size="3" color="gray">
            Esta área hospedará os diagramas e dados estruturados do modelo C4. A migração para o
            Radix ainda está em andamento; utilize os capítulos individuais para navegar pelos
            materiais existentes enquanto os módulos interativos são reconstruídos.
          </Text>
          <Card>
            <Text size="2" color="gray">
              Compartilhe feedbacks sobre os componentes desejados para priorizarmos a implementação
              completa.
            </Text>
          </Card>
        </Flex>
      </main>
    </Box>
  );
}

export default StructuralWorkspace;
