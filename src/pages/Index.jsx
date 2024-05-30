import { Box, Container, VStack, Text, Flex, Image, IconButton, HStack, Spacer, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
      const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const handleSkipBackward = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

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
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center" onClick={() => handleSongClick({ title: "Song 1", artist: "Artist 1", src: "path/to/song1.mp3" })}>
            <Image src="https://via.placeholder.com/150" alt="Playlist 1" borderRadius="md" mb={2} />
            <Text>Playlist 1</Text>
          </Box>
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center" onClick={() => handleSongClick({ title: "Song 2", artist: "Artist 2", src: "path/to/song2.mp3" })}>
            <Image src="https://via.placeholder.com/150" alt="Playlist 2" borderRadius="md" mb={2} />
            <Text>Playlist 2</Text>
          </Box>
          <Box bg="gray.700" p={4} m={2} borderRadius="md" width="200px" textAlign="center" onClick={() => handleSongClick({ title: "Song 3", artist: "Artist 3", src: "path/to/song3.mp3" })}>
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
            <Text fontSize="lg">{currentSong ? currentSong.title : "Song Title"}</Text>
            <Text fontSize="sm">{currentSong ? currentSong.artist : "Artist Name"}</Text>
          </Box>
          <Spacer />
          <HStack spacing={4}>
            <IconButton aria-label="Previous" icon={<FaBackward />} onClick={handleSkipBackward} />
            <IconButton aria-label="Play/Pause" icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlayPause} />
            <IconButton aria-label="Next" icon={<FaForward />} onClick={handleSkipForward} />
          </HStack>
          <Box ml={4}>
            <Text>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, "0")} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")}</Text>
          </Box>
          <Box ml={4} width="100px">
            <Slider aria-label="Volume" value={volume * 100} onChange={(val) => setVolume(val / 100)}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
        <audio ref={audioRef} src={currentSong ? currentSong.src : ""} onEnded={() => setIsPlaying(false)} />
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="white" p={4} mt={8} textAlign="center">
        <Text>&copy; 2023 MusicStream. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Index;