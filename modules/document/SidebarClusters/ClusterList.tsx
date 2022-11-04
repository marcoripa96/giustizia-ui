import { Cluster } from "@/server/routers/document";
import styled from "@emotion/styled";
import { useState } from "react";
import ClusterCard from "./ClusterCard";

type ClusterListProps = {
  clusters: Cluster[];
}

const ListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%'
})

const ClusterList = ({ clusters }: ClusterListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClusterCardClick = (id: number) => {
    setSelectedIndex((oldId) => {
      if (oldId === id) {
        return null;
      }
      return id;
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

export default ClusterList;