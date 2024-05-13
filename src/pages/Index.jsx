import { useState, useEffect } from "react";
import { Box, Container, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Text, VStack, Image, useBreakpointValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = searchTerm ? cities.filter((city) => city.city.toLowerCase().includes(searchTerm.toLowerCase()) || city.country.toLowerCase().includes(searchTerm.toLowerCase())) : cities;

  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(1, 1fr)",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="nav" bg="teal.500" color="white" py={4} px={8}>
        <Heading as="h1" size="lg">
          NomadRank
        </Heading>
      </Box>
      <VStack spacing={8} align="stretch" p={8}>
        <Box position="relative" height="300px" width="full">
          <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTcxNTU0NjcxN3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Tropical Beach" objectFit="cover" width="full" height="full" position="absolute" zIndex="-1" />
          <VStack spacing={4} justify="center" height="full" color="white" p={4} bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.2))">
            <Heading as="h2" size="xl">
              Find Your Perfect Nomad City
            </Heading>
            <Text fontSize="lg">Explore the best cities for digital nomads, ranked by the community.</Text>
          </VStack>
        </Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search cities or countries" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </InputGroup>
        <Grid templateColumns={gridTemplateColumns} gap={6}>
          {filteredCities.map((city) => (
            <Box key={city.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading as="h4" size="md">
                {city.city}
              </Heading>
              <Text mt={2}>{city.country}</Text>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Index;
