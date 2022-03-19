import { useTheme } from "@nextui-org/react";
import { FC, useState, useEffect } from "react";
import { fadeInStaggerContainer } from "../../shared/animations/fade-in";
import { UserPlaces } from "../../shared/user/types";
import { ResumeContainer, Resume, ResumeBar, ResumeCard, Progress } from "../styled";

type VotingResumeProps = {
  userPlaces: UserPlaces;
};

type Resume = Record<string, number>;

export const VotingResume: FC<VotingResumeProps> = ({ userPlaces }) => {
  const [resume, setResume] = useState<Resume>({});
  const [total, setTotal] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const values = Object.values(userPlaces)
      .flat()
      .map(({ selectedCard }) => selectedCard)
      .filter(c => !!c);

    const r = values.reduce((acc, current) => {
      if (!current) {
        return acc;
      }

      acc[current] =  acc[current] ? acc[current] + 1 : 1;

      return acc;
    }, {} as Resume);

    setTotal(values.length);
    setResume(r);
  }, [userPlaces]);

  return (
    <ResumeContainer {...fadeInStaggerContainer}>
      {
        Object.entries(resume).map(([value, qty]) => (
          <Resume key={value}>
            <ResumeBar isDark={isDark}>
              <Progress transition={{ duration: 400 }} animate={{ height: (100 * qty) / total + '%' }} percentage={(100 * qty) / total}/>
            </ResumeBar>
            <ResumeCard>
              { value }
            </ResumeCard>
            <span> Vote { qty } </span>
          </Resume>
        ))
      }
    </ResumeContainer>
  );
}