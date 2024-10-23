import styled from "styled-components";
import React, { useState } from "react";
import DynamicSVG from "./DynamicSVG";
import theme from "../theme";
import LocationSelectModal from "./LocationSelectModal";
import { useDispatch } from "react-redux";
import { setLocationModal } from "../redux/modalSlice";

const StyledButton = styled.div`
  cursor: pointer;
  width: ${({ width }) => width};
  background-color: ${({ color }) => color};
  height: 45px;
  border-radius: 100px;
  &:hover {
    opacity: 0.7;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StyledP = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
`;

function SelectedButton({ width, color }) {
  const [location, setLocation] = useState(null);
  const [origin, setOrign] = useState(null);
  const dispatch = useDispatch();

  return (
    <StyledButton
      width={width}
      color={color}
      onClick={() => {
        dispatch(setLocationModal(true));
        setOrign(location);
      }}
    >
      <DynamicSVG svgUrl="/location.svg" color={theme.colors.neutral700} />
      <StyledP>
        {location
          ? `${location?.name}, ${location.nationName}`
          : `장소를 선택해주세요.`}
      </StyledP>
      <LocationSelectModal
        origin={origin}
        location={location}
        setLocation={setLocation}
      />
    </StyledButton>
  );
}

export default SelectedButton;
