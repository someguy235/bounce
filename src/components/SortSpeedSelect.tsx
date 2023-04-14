import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from "@chakra-ui/react";

type SortSpeedSelectProps = {
  sortSpeed: number;
  setSortSpeed: Function;
};
const SortSpeedSelect = ({ sortSpeed, setSortSpeed }: SortSpeedSelectProps) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={sortSpeed}
      min={10}
      max={1000}
      onChangeEnd={(val) => setSortSpeed(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={250} mt="1" ml="-2.5" fontSize="sm">
        .25
      </SliderMark>
      <SliderMark value={500} mt="1" ml="-2.5" fontSize="sm">
        .5
      </SliderMark>
      <SliderMark value={750} mt="1" ml="-2.5" fontSize="sm">
        .75
      </SliderMark>
    </Slider>
  );
};

export default SortSpeedSelect;
