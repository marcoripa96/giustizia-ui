import { Cluster } from "@/server/routers/document";
import styled from "@emotion/styled";
import { useState } from "react";
import { ProcessedCluster } from "../DocumentProvider/types";
import ClusterCard from "./ClusterCard";
import ClusterGroup from "./ClusterGroup";


type ClustersListProps = {
  clusters: ProcessedCluster[];
}

const ListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '10px'
})

const ClustersList = ({ clusters }: ClustersListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClusterCardClick = (index: number) => {
    setSelectedIndex((oldIndex) => {
      if (oldIndex === index) {
        return null;
      }
      return index;
    })
  }

  return (
    <ListContainer>
      {clusters.map((cluster) => (
        <ClusterCard
          key={cluster.id}
          onClick={() => handleClusterCardClick(cluster.id)}
          selected={selectedIndex === cluster.id}
          {...cluster}
        />
      ))}
    </ListContainer>
  )
};

export default ClustersList;