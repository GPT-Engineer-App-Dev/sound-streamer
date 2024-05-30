import { Box, Container, VStack, Text, Flex, Image, IconButton, HStack, Spacer, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.xl" p={0}>
      {/* Navigation Bar */}
      <Flex as="nav" bg="gray.900" color="white" p={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">MusicStream</Text>
        <Spacer />
        <HStack spacing={4}>
          <Text>Home</Text>
          <Text>Browse</Text>
          <Text>Library</Text>
        </HStack>
      </Flex>

      {/* Featured Playlists */}
      <Box bg="gray.800" color="white" p={8}>
        <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="3xl">Featured Playlists</Text>
        <Button colorScheme="blue" onClick={() => navigate("/create-playlist")}>Create Playlist</Button>
      </Flex>
        <Flex wrap="wrap" justify="space-around">
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center">
            <Image src="https://via.placeholder.com/150" alt="Playlist 1" borderRadius="md" mb={2} />
            <Text>Playlist 1</Text>
          </Box>
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center">
            <Image src="https://via.placeholder.com/150" alt="Playlist 2" borderRadius="md" mb={2} />
            <Text>Playlist 2</Text>
          </Box>
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center">
            <Image src="https://via.placeholder.com/150" alt="Playlist 3" borderRadius="md" mb={2} />
            <Text>Playlist 3</Text>
          </Box>
        </Flex>
      </Box>

      {/* Music Player */}
      <Box bg="gray.900" color="white" p={4} position="fixed" bottom={0} width="100%">
        <Flex align="center">
          <Image src="https://via.placeholder.com/50" alt="Album Art" borderRadius="md" />
          <Box ml={4}>
            <Text fontSize="lg">Song Title</Text>
            <Text fontSize="sm">Artist Name</Text>
          </Box>
          <Spacer />
          <HStack spacing={4}>
            <IconButton aria-label="Previous" icon={<FaBackward />} />
            <IconButton aria-label="Play/Pause" icon={<FaPlay />} />
            <IconButton aria-label="Next" icon={<FaForward />} />
          </HStack>
        </Flex>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" p={4} mt={8} textAlign="center">
        <Text>&copy; 2023 MusicStream. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Index;