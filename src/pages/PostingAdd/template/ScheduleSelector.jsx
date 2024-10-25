import styled from "styled-components";
import theme from "../../../theme";
import DynamicSVG from "../../../components/DynamicSVG";
import { useEffect, useState } from "react";
import ScheduleSelectorModal from "./ScheduleSelectorModal";
import { useSelector } from "react-redux";
import { selectSpace } from "../../../redux/spaceSlice";

const ScheduleSelectorContainer = styled.div`
  height: 48px;
  background: ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-left: 20px;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    transform: scale(0.99);
  }
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.neutral50};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.light};
`;

const NoneIconTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.neutral50};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.regular};
`;

const ScheduleSelector = ({ setSchedule }) => {
  const { spaceDetail, selectedSpaceId, postingList, scheduleList } =
    useSelector(selectSpace);
  const [isModal, setIsModal] = useState(false);
  const [groupedByDay, setGroupdedByDay] = useState(null);

  useEffect(() => {
    setGroupdedByDay(groupSchedulesByDay(scheduleList));
  }, [scheduleList]);

  const groupSchedulesByDay = (scheduleList) => {
    return scheduleList.reduce((groups, schedule) => {
      const { day } = schedule;
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(schedule);
      return groups;
    }, {});
  };

  return (
    <>
      {
        <ScheduleSelectorModal
          setSchedule={setSchedule}
          isModal={isModal}
          setIsModal={setIsModal}
          groupedByDay={groupedByDay}
        />
      }
      <ScheduleSelectorContainer onClick={() => setIsModal(!isModal)}>
        <InfoArea>
          <IconTextArea>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral50}
              width={20}
              height={20}
            />
            날짜
          </IconTextArea>
          <IconTextArea>
            <DynamicSVG
              svgUrl="/location.svg"
              color={theme.colors.neutral50}
              width={20}
              height={20}
            />
            장소
          </IconTextArea>
          <NoneIconTextArea>메모</NoneIconTextArea>
        </InfoArea>
        <img src="/arrow-down.svg" width={16} height={16} />
      </ScheduleSelectorContainer>
    </>
  );
};

export default ScheduleSelector;
