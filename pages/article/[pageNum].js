import React, { Component } from 'react';
import { Pagination } from 'antd';
import { withRouter } from 'next/router';
import ArticleContent from '../../components/article/article-content';
import KnowMeLayout from '../../components/layout';

class Article extends Component {
  state = {
    list: [],
    loading: false,
    // start 滚动加载
    hasMore: true,
    pageNum: 0,
    pageSize: 20,
    total: 0
    // end
  };
  componentDidMount() {
  };
  onPageChange =(page, pageSize)=>{
    this.props.router.push("/article/"+(page).toString());
  }

  onChange = checked => {
    this.setState({ loading: !checked });
  };


  render() {
    if (this.props.router.isFallback) {
      return <KnowMeLayout><div>Loading......I'm sorry for the wait!!</div></KnowMeLayout>;
    }
    let ArticleContents = [];
    this.props.posts.data.content.forEach((element, index, array) => {
        ArticleContents.push(<ArticleContent element={element} key={index} loading={this.state.loading} location={"/article"} />);
    });
    return (
      <KnowMeLayout>
          {ArticleContents}
          {/* Tip:内部元素不要加高度以及overflow:auto等属性！！！！ */}
          <Pagination showQuickJumper defaultCurrent={this.props.router.query.pageNum} total={this.props.posts.data.totalElements}
           defaultPageSize={20} showSizeChanger={false} onChange={this.onPageChange}/>
      </KnowMeLayout>
    );
  };
}

export default withRouter(Article);

export async function getStaticProps({params }) {
  const res = await fetch("http://192.168.131.26:8080/api/document/findByPageAndType?type=ARTICLE&page="
  +(params.pageNum-1)+"&pageSize=20");
  const posts = await res.json();
  return {
    props: {posts},
    revalidate: 1, // In seconds
  }
}
export async function getStaticPaths() {
  const res = await fetch("http://192.168.131.26:8080/api/document/findByPageAndType?type=ARTICLE&page=0&pageSize=20");
  const posts = await res.json();
  const totalPages = posts.data.totalPages;
  let paths=[];
  for(let i=1;i<totalPages+1;i++){
    paths.push({params:{pageNum: i.toString()}})
  }
  return {
    paths: paths,
    fallback: true  // See the "fallback" section below
    // 会导致多调用一次 page ，如 /article/details/[id]
  };
}