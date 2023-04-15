import { useState } from "react";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Tooltip,
} from "@chakra-ui/react";

type ItemCountSelectProps = {
  itemSize: number;
  setItemSize: Function;
  sorting: boolean;
};
const ItemCountSelect = ({
  itemSize,
  setItemSize,
  sorting,
}: ItemCountSelectProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipValue, setTooltipValue] = useState(itemSize);
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={itemSize}
      min={10}
      max={100}
      onChange={(val) => setTooltipValue(val)}
      onChangeEnd={(val) => setItemSize(val)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      isDisabled={sorting}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
        25
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50
      </SliderMark>
      <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
        75
      </SliderMark>
      <Tooltip
        hasArrow
        bg="blue.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${tooltipValue}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default ItemCountSelect;
