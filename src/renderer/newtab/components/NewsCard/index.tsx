import React from 'react';
import * as Card from '@components/Card';

import {
  CardImage,
  Icon,
  Overline,
  SecondaryText,
  Source,
  SourceContainer,
  Title,
} from './styles';
import { loadImage, getTimeOffset } from '~/utils';
import store from '@newtab/store';
import { NewsArticle } from '~/interfaces';

export interface Props {
  data: NewsArticle;
}

export interface State {
  loaded: boolean;
}

export default class NewsCard extends React.Component<Props, State> {
  public state: State = {
    loaded: false,
  };

  public async componentDidMount() {
    const { data } = this.props;

    await loadImage(data.urlToImage);
    await loadImage(data.icon);

    requestAnimationFrame(() => {
      this.setState({ loaded: true });
    });
  }

  public render() {
    const { data } = this.props;
    const { loaded } = this.state;

    let desc: string = data.description;
    if (data && data.description) {
      desc = data.description.replace(/&nbsp;/g, '');
    }

    return (
      <a href={data.url}>
        <Card.Root>
          <CardImage visible={loaded} src={data.urlToImage} />
          <Card.Header>
            <Overline>General</Overline>
            <Title>{data.title}</Title>

            {desc &&
              desc.indexOf('�') === -1 &&
              desc.trim() !== '' && <SecondaryText>{desc}</SecondaryText>}

            <SourceContainer>
              <Icon visible={loaded} src={data.icon} />
              <Source>
                {data.source.name} -{' '}
                {getTimeOffset(store.dictionary, new Date(data.publishedAt))}
              </Source>
            </SourceContainer>
          </Card.Header>
        </Card.Root>
      </a>
    );
  }
}
