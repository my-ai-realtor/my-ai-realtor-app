import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const _Data = () => {
  const [gameDetails, setGameDetails] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [dailyChange, setDailyChange] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [upvoteDownvoteRatio, setUpvoteDownvoteRatio] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [metaTrends, setMetaTrends] = useState([]);

  useEffect(() => {
    console.log('Calling fetchGameDetails method...');
    Meteor.call('fetchGameDetails', (error, result) => {
      if (error) {
        console.error('Error fetching game details:', error.message);
      } else {
        console.log('Game details received:', result);
        setGameDetails(result);
        setAggregatedData(aggregateData(result));
        processDailyInsights(result);
        processMetaTrends(result);
      }
    });
  }, []);

  const aggregateData = (data) => {
    const genreMap = data.reduce((acc, game) => {
      const genre = game.genre;
      if (!acc[genre]) {
        acc[genre] = {
          genre: genre,
          activePlayers: 0,
          peakPlayers: 0,
          upvotes: 0,
          downvotes: 0
        };
      }
      acc[genre].activePlayers += game.activePlayers;
      acc[genre].peakPlayers += game.peakPlayers;
      acc[genre].upvotes += game.upvotes;
      acc[genre].downvotes += game.downvotes;
      return acc;
    }, {});

    return Object.values(genreMap);
  };

  const processDailyInsights = (data) => {
    // Top 5 games by active players
    const topGames = [...data].sort((a, b) => b.activePlayers - a.activePlayers).slice(0, 5);
    setTopGames(topGames);

    // Daily change in active players (for simplicity, assuming daily data is already sorted by date)
    const dailyChange = data.map((game, index) => ({
      name: game.name,
      change: index > 0 ? game.activePlayers - data[index - 1].activePlayers : 0
    }));
    setDailyChange(dailyChange);

    // Top genres by active players
    const genreMap = data.reduce((acc, game) => {
      const genre = game.genre;
      if (!acc[genre]) {
        acc[genre] = 0;
      }
      acc[genre] += game.activePlayers;
      return acc;
    }, {});
    const topGenres = Object.entries(genreMap).map(([genre, activePlayers]) => ({ genre, activePlayers }))
      .sort((a, b) => b.activePlayers - a.activePlayers).slice(0, 5);
    setTopGenres(topGenres);

    // Upvote to downvote ratio
    const upvoteDownvoteRatio = data.map(game => ({
      name: game.name,
      ratio: game.downvotes > 0 ? (game.upvotes / game.downvotes).toFixed(2) : game.upvotes
    })).sort((a, b) => b.ratio - a.ratio).slice(0, 5);
    setUpvoteDownvoteRatio(upvoteDownvoteRatio);
  };

  const processMetaTrends = (data) => {
    const wordMap = data.reduce((acc, game) => {
      const words = game.name.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (!acc[word]) {
          acc[word] = {
            word: word,
            count: 0,
            activePlayers: 0,
            score: 0
          };
        }
        acc[word].count += 1;
        acc[word].activePlayers += game.activePlayers;
        acc[word].score = acc[word].count * acc[word].activePlayers; // Calculate combined score
      });
      return acc;
    }, {});

    const metaTrending = Object.values(wordMap).sort((a, b) => b.score - a.score);
    setMetaTrends(metaTrending);
  };

  const generateMetaTrendsFrequencyChartOptions = (data) => {
    const categories = data.map(trend => trend.word);
    const counts = data.map(trend => trend.count);

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Meta Trends by Word Frequency'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Words'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Frequency'
        }
      },
      series: [{
        name: 'Frequency',
        data: counts
      }]
    };
  };

  const generateMetaTrendsActivePlayersChartOptions = (data) => {
    const categories = data.map(trend => trend.word);
    const activePlayers = data.map(trend => trend.activePlayers);
    const scores = data.map(trend => trend.score); // Use the combined score

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Meta Trends by Combined Score'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Words'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Combined Score'
        }
      },
      series: [{
        name: 'Combined Score',
        data: scores
      }]
    };
  };

  const generateChartOptions = (data) => {
    const categories = data.map(entry => entry.genre);
    const activePlayers = data.map(entry => entry.activePlayers);
    const peakPlayers = data.map(entry => entry.peakPlayers);

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Game Details by Genre'
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Players'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Active Players',
        data: activePlayers
      }, {
        name: 'Peak Players',
        data: peakPlayers
      }]
    };
  };

  const generatePieChartOptions = (data) => {
    const genreData = data.map(entry => ({
      name: entry.genre,
      y: entry.activePlayers
    }));

    return {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Game Genre Distribution by Active Players'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Genres',
        colorByPoint: true,
        data: genreData
      }]
    };
  };

  const generateTopGamesChartOptions = (data) => {
    const categories = data.map(game => game.name);
    const activePlayers = data.map(game => game.activePlayers);

    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Top 5 Games by Active Players'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Games'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Active Players'
        }
      },
      series: [{
        name: 'Active Players',
        data: activePlayers
      }]
    };
  };

  const generateDailyChangeChartOptions = (data) => {
    const categories = data.map(game => game.name);
    const changes = data.map(game => game.change);

    return {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Daily Change in Active Players'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Games'
        }
      },
      yAxis: {
        title: {
          text: 'Change in Active Players'
        }
      },
      series: [{
        name: 'Change in Active Players',
        data: changes
      }]
    };
  };

  const generateTopGenresChartOptions = (data) => {
    const categories = data.map(genre => genre.genre);
    const activePlayers = data.map(genre => genre.activePlayers);

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Genres by Active Players'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Genres'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Active Players'
        }
      },
      series: [{
        name: 'Active Players',
        data: activePlayers
      }]
    };
  };

  const generateUpvoteDownvoteChartOptions = (data) => {
    const categories = data.map(game => game.name);
    const ratios = data.map(game => parseFloat(game.ratio));

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top 5 Upvote to Downvote Ratios'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Games'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Upvote to Downvote Ratio'
        }
      },
      series: [{
        name: 'Ratio',
        data: ratios
      }]
    };
  };

  return (
    <Container id="data-visualization-page" fluid className="py-3">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1>Daily Market Insights as of {new Date().toLocaleString()}</h1>
        </Col>
        <Col xs={12} md={6}>
          {topGames.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateTopGamesChartOptions(topGames)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {dailyChange.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateDailyChangeChartOptions(dailyChange)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {topGenres.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateTopGenresChartOptions(topGenres)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {upvoteDownvoteRatio.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateUpvoteDownvoteChartOptions(upvoteDownvoteRatio)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {aggregatedData.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateChartOptions(aggregatedData)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {aggregatedData.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generatePieChartOptions(aggregatedData)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {metaTrends.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateMetaTrendsFrequencyChartOptions(metaTrends)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
        <Col xs={12} md={6}>
          {metaTrends.length > 0 ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={generateMetaTrendsActivePlayersChartOptions(metaTrends)}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default _Data;
