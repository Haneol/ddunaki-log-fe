import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";

const SpaceArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 5px;
  padding: 10px 20px;
  cursor: pointer;

  transition: 200ms;

  &:hover {
    transform: scale(0.985);
  }
`;

const Space = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
`;

const SpaceSelector = () => {
  return (
    <SpaceArea>
      <Space>스페이스를 선택하세요</Space>
      <Location>
        <DynamicSVG svgUrl="/location.svg" color={theme.colors.neutral400} />
        City, Nation
      </Location>
    </SpaceArea>
  );
};

export default SpaceSelector;
