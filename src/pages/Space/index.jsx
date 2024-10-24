import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../theme";
import { selectSpace } from "../../redux/spaceSlice";
import { useDispatch, useSelector } from "react-redux";
import DynamicSVG from "../../components/DynamicSVG";
import { formatDate } from "../../time";
import { nationCodeToName, cityCodeToName } from "../../data/LocationCode";
import JoinMember from "./template/JoinMember";
import Schedule from "./template/Schedule";
import PostingList from "./template/PostingList";
import ScheduleModal from "./template/ScheduleModal";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-right: 30px;
  min-width: 1280px;
  padding-top: 30px;
  position: relative;
  top: -30px;
  background-color: #f1f5f9;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.h1};
  font-weight: ${theme.fontWeight.header};
  color: ${theme.colors.neutral600};
`;

const TopArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SideWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SideItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral600};
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.neutral400};
  margin-bottom: 15px;
`;

const MiddleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  gap: 20px;
`;

function Space() {
  const { spaceDetail } = useSelector(selectSpace);
  const [groupedByDay, setGroupdedByDay] = useState(null);

  useEffect(() => {
    setGroupdedByDay(groupSchedulesByDay(spaceDetail.scheduleList));
  }, [spaceDetail]);

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

  const deleteSchedule = (scheduleid, spaceId) => {
    alert(scheduleid + spaceId);
  };

  return (
    <Container>
      <TopArea>
        <Title>{spaceDetail.spaceName}</Title>
        <SideWrap>
          <SideItem>
            <DynamicSVG
              svgUrl="/calendar.svg"
              color={theme.colors.neutral600}
            />
            <p>
              {`${formatDate(spaceDetail.startDate)} ~ ${formatDate(
                spaceDetail.endDate
              )}`}
            </p>
          </SideItem>
          <SideItem>
            <DynamicSVG
              svgUrl="/location.svg"
              color={theme.colors.neutral600}
            />
            <p>
              {`
              ${cityCodeToName[spaceDetail.cityCode]}, ${
                nationCodeToName[spaceDetail.nationCode]
              }
              `}
            </p>
          </SideItem>
        </SideWrap>
      </TopArea>
      <Description>{spaceDetail.description}</Description>

      <MiddleArea>
        <JoinMember
          maxMembers={spaceDetail.maxMembers}
          members={spaceDetail.members}
          leaderId={spaceDetail.leaderId}
        />
        <Schedule groupedByDay={groupedByDay} />
      </MiddleArea>
      <PostingList postingList={spaceDetail.postingList} />
      <ScheduleModal
        groupedByDay={groupedByDay}
        deleteSchedule={deleteSchedule}
      />
    </Container>
  );
}

export default Space;
