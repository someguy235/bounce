import { useState } from "react";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Tooltip,
} from "@chakra-ui/react";

type SortSpeedSelectProps = {
  sortSpeed: number;
  setSortSpeed: Function;
  sorting: boolean;
};
const SortSpeedSelect = ({
  sortSpeed,
  setSortSpeed,
  sorting,
}: SortSpeedSelectProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipValue, setTooltipValue] = useState(sortSpeed);
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={sortSpeed}
      min={100}
      max={1000}
      step={100}
      onChange={(val) => setTooltipValue(val)}
      onChangeEnd={(val) => setSortSpeed(val)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      isDisabled={sorting}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={250} mt="1" ml="-2.5" fontSize="sm">
        .25s
      </SliderMark>
      <SliderMark value={500} mt="1" ml="-2.5" fontSize="sm">
        .5s
      </SliderMark>
      <SliderMark value={750} mt="1" ml="-2.5" fontSize="sm">
        .75s
      </SliderMark>
      <Tooltip
        hasArrow
        bg="blue.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${tooltipValue}ms`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default SortSpeedSelect;
