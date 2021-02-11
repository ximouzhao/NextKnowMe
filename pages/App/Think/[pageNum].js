import React, { Component } from 'react';
import WrapFetch from '../../tools/wrap-fetch';
import ThinkContent from './think-content';
import DocumentType from '../../Constant/DocumentType';
import InfiniteScroll from 'react-infinite-scroller';
import KnowMeLayout from '../../components/layout';
import { withRouter } from 'next/router';

class ThinkList extends Component {
  state = {
    list: [{ title: '1', content: '1' }, { title: '2', content: '2' }, { title: '3', content: '3' }, { title: '4', content: '4' }],
    loading: true,
    // start 滚动加载
    hasMore: true,
    pageNum: 0,
    pageSize: 20,
    total: 0
    // end
  };
  // 获取下一页信息
  getMore = (page) => {
    console.log("getmore",page)
    if (this.state.total === this.state.list.length) {
      return;
    }
    this.setState({
      pageNum: page
    }, () => {
      this.getMoreData(page); //请求数据接口
    });
  }
  componentDidMount() {
    //this.getFirstData();
  }
  getFirstData = () => {
    this.setState({ loading: { tip: '正在加载...', spinning: true } });
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.THINK, page: 0, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ list: data.content, total: data.totalElements, hasMore: data.totalPages > 1, loading: false });
      }
    );
  }
  getMoreData = (page) => {
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.THINK, page: page, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ list: this.state.list.concat(data.content), total: data.totalElements, hasMore: data.totalPages > page+1, scrollLoading: false });
      }
    );
  };
  render() {
    console.log(this.props.router.pathname)
    console.log(this.props.router.query.pageNum)
    debugger
    let data = this.props.data;
    if(this.state.list == null){
      this.setState({ list: data.content, total: data.totalElements, hasMore: data.totalPages > 1, loading: false });
    }
    let ThinkContents = [];
    this.state.list.forEach((element, index, array) => {
      ThinkContents.push(<ThinkContent element={element} key={index} loading={this.state.loading} />);
    });
    return (
      <div>
        <KnowMeLayout>
          <InfiniteScroll
            className="list-contents"
            initialLoad={false}
            pageStart={0}
            loadMore={this.getMore.bind(this)}
            threshold={800}
            hasMore={this.state.hasMore}
            useWindow={true}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {ThinkContents}
            {/* Tip:内部元素不要加高度以及overflow:auto等属性！！！！ */}
            {!this.state.hasMore ? <div className="end-text">-------- 你已经看完所有的随想啦 --------</div> : ""}
          </InfiniteScroll>
        </KnowMeLayout>

      </div>
    );

  }

}
export default withRouter(ThinkList);

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data:{
        "code": 0,
        "msg": "success",
        "data": {
          "content": [
            {
              "id": 2886,
              "name": null,
              "content": "[React全家桶_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1Ba4y1H769/?spm_id_from=autoNext) (https://www.bilibili.com/video/BV1Ba4y1H769/?spm_id_from=autoNext)",
              "tags": null,
              "type": "THINK",
              "isDelete": null,
              "deletedAt": null,
              "createTime": "2021-02-10 02:23:50",
              "ts": "2021-02-10 02:23:50"
            }
          ],
          "pageable": {
            "sort": {
              "sorted": true,
              "unsorted": false,
              "empty": false
            },
            "pageSize": 20,
            "pageNumber": 0,
            "offset": 0,
            "unpaged": false,
            "paged": true
          },
          "totalPages": 111,
          "last": false,
          "totalElements": 2213,
          "first": true,
          "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
          },
          "numberOfElements": 20,
          "size": 20,
          "number": 0,
          "empty": false
        }
      },
    },
  }
}


export async function getStaticPaths() {
  return {
    paths: [
      { params: { pageNum:'0' } } // See the "paths" section below
    ],
    fallback: true  // See the "fallback" section below
  };
}