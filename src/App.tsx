import "./App.css"

type listItemProps = {
  type: string,
  url?: string,
  title?: string,
  views: number,
}

type listProps = {
  list: listItemProps[],
}

function New(props: {children: JSX.Element}) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
}

function Popular(props: {children: JSX.Element}) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
}

function Article(props: listItemProps) {
  return (
    <div className="item item-article">
      <h3><a href="#">{props.title}</a></h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
}

function Video(props: listItemProps) {
  return (
    <div className="item item-video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
}


function withComment<T extends listItemProps>(Component: React.ComponentType<T>) {

  const WithСomment = (props: listItemProps) => {
    if (props.views >= 1000) {
      return (
        <Popular>
          <Component {...props as T} />
        </Popular>
      );
    }
    if (props.views < 100) {
      return (
        <New>
          <Component {...props as T} />
        </New>
      )
    }
    return (
      <Component {...props as T} />
    );
  }

  const displayName = Component.displayName || Component.name || "Component";
  WithСomment.displayName = `withСomment(${displayName})`;

  return WithСomment;
}

const VideoWithComment = withComment(Video);

const ArticleWithComment = withComment(Article);

function List(props: listProps) {
  return props.list.map((item, key) => {
    switch (item.type) {
      case 'video':
        return (
          <VideoWithComment {...item} key={key} />
        );
      case 'article':
        return (
          <ArticleWithComment {...item} key={key} />
        );
    }
  });
}

export default function App() {
  const list = [
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ];

  return (
    <List list={list} />
  );
}
