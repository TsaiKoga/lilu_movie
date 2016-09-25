import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const GridStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '85%',
    height: '100%',
    marginBottom: 24,
  },
};

const Movies = [
  {
    img: './../images/p2255668573.jpg',
    title: '魔兽争霸',
    author: 'Me',
  }, {
    img: './../images/p2332092960.jpg',
    title: '美国队长3',
    author: 'Me',
  }, {
    img: './../images/p2340515119.jpg',
    title: '地雷区',
    author: 'Me',
  }, {
    img: './../images/p2372661910.jpg',
    title: '奇幻森林',
    author: 'Me',
  },
];

const MovieGridList = () => (
  <div style={GridStyles.root}>
    <GridList cellHeight={400} padding={4} cols={4} style={GridStyles.gridList}>
      <Subheader>电影</Subheader>
      { Movies.map((movie) => (
        <GridTile
          key={movie.img}
          title={movie.title}
          subtitle={<span>by <b>{movie.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={movie.img} />
        </GridTile>
      )) }
    </GridList>
  </div>
);

export default MovieGridList;
