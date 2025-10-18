import { Link, Navigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text
} from "@radix-ui/themes";
import { useAppData } from "@/context/WorkspaceProvider.jsx";

function ChapterLanding({ slug }) {
  const { chapters = [] } = useAppData();
  const chapter = chapters.find((item) => item.slug === slug);

  if (!chapter) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box className="app-surface">
      <main className="chapter-page">
        <Flex direction="column" gap="5">
          <Flex align="center" gap="3" wrap="wrap">
            <Button variant="ghost" color="gray" asChild>
              <Link to="/">Voltar</Link>
            </Button>
            <Badge size="2" variant="soft" color="iris">
              Capítulo {chapter.order}
            </Badge>
            <Badge size="2" variant="soft" color="green">
              {chapter.status || "Disponível"}
            </Badge>
          </Flex>

          <Flex direction="column" gap="3">
            <Heading size="8">{chapter.title}</Heading>
            <Text size="3" color="gray">
              {chapter.description}
            </Text>
          </Flex>

          <Card>
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Documento base
              </Text>
              <Text size="2" color="gray">
                Consulte a especificação em <code>{chapter.specPath}</code>. Use este capítulo como
                checklist ao relacionar requisitos e artefatos.
              </Text>
              <Button variant="surface" color="iris" asChild>
                <a href={chapter.specPath} target="_blank" rel="noreferrer">
                  Abrir documentação
                </a>
              </Button>
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Focos principais
              </Text>
              <Flex gap="2" wrap="wrap">
                {chapter.focusAreas.map((area) => (
                  <Badge key={area} variant="outline" color="iris">
                    {area}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          </Card>

          <Separator size="4" />

          <Flex justify="between" align="center" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                Ínicio
              </Text>
              <Button variant="ghost" color="gray" asChild>
                <Link to="/">Voltar ao dashboard</Link>
              </Button>
            </Flex>
            <Text size="1" color="gray">
              Slots detalhados deste capítulo serão adicionados em breve.
            </Text>
          </Flex>
        </Flex>
      </main>
    </Box>
  );
}

export default ChapterLanding;
