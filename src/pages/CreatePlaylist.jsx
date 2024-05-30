import { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, VStack, Text, HStack, Spacer, Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const navigate = useNavigate();

  const availableSongs = [
    { id: 1, title: "Song 1", artist: "Artist 1" },
    { id: 2, title: "Song 2", artist: "Artist 2" },
    { id: 3, title: "Song 3", artist: "Artist 3" },
  ];

  const handleSongSelection = (songId) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.includes(songId)
        ? prevSelectedSongs.filter((id) => id !== songId)
        : [...prevSelectedSongs, songId]
    );
  };

  const handleSavePlaylist = () => {
    // Logic to save the playlist
    console.log("Playlist Name:", playlistName);
    console.log("Selected Songs:", selectedSongs);
    navigate("/");
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" bg="gray.900" color="white" p={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">MusicStream</Text>
        <Spacer />
        <HStack spacing={4}>
          <Text onClick={() => navigate("/")}>Home</Text>
          <Text>Browse</Text>
          <Text>Library</Text>
        </HStack>
      </Flex>

      <Box bg="gray.800" color="white" p={8} mt={4} borderRadius="md">
        <VStack spacing={4} align="stretch">
          <FormControl id="playlist-name">
            <FormLabel>Playlist Name</FormLabel>
            <Input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
            />
          </FormControl>

          <Box>
            <Text fontSize="xl" mb={2}>Add Songs</Text>
            {availableSongs.map((song) => (
              <Checkbox
                key={song.id}
                isChecked={selectedSongs.includes(song.id)}
                onChange={() => handleSongSelection(song.id)}
              >
                {song.title} - {song.artist}
              </Checkbox>
            ))}
          </Box>

          <Button colorScheme="blue" onClick={handleSavePlaylist}>Save Playlist</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePlaylist;