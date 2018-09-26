import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { commonCreators } from '../../store/modules/common';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { getScrollBottom } from '../../lib/common';
import { baseCreators } from '../../store/modules/base';
import { pinCreators } from '../../store/modules/pin';
import CommonCardList from '../../components/common/CommonCardList';
import CommonUserList from '../../components/common/CommonUserList';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { type: string };
type SearchListProps = StateProps & DispatchProps & OwnProps;

class SearchList extends React.Component<SearchListProps> {
    public prev: string | null = null;

    public onScroll = throttle(() => {
        const scrollButton = getScrollBottom();
        if (scrollButton > 1000) return;
        this.prefetch();
    }, 250);

    public prefetch = async () => {
        const { CommonActions, datas, next } = this.props;
        if (!datas || datas.length === 0) return;

        if (this.props.prefetched) {
            CommonActions.revealPrefetched('search');
            await Promise.resolve();
        }

        if (next === this.prev) return;
        this.prev = next;

        try {
            await CommonActions.prefetchList(next);
        } catch (e) {
            console.log(e);
        }
    }

    public onOpen = async (id: string) => {
        const { BaseActions, PinActions } = this.props;
        BaseActions.setPinImage(true);

        try {
            await PinActions.getPin(id);
        } catch (e) {
            console.log(e);
        }
    }

    public initialize = async () => {
        const { CommonActions, type, value } = this.props;
                
        try {
            if (type === 'pin') {
                await CommonActions.searchPin(value);
            } else if (type === 'user') {
                await CommonActions.searchUser(value);
            }
        } catch (e) {
            console.log(e);
        }
    }

    public listenScroll = () => {
        window.addEventListener('scroll', this.onScroll);
    };
    
    public unlistenScroll = () => {
        window.removeEventListener('scroll', this.onScroll);
    };

    public componentDidMount() {
        this.initialize();
        this.listenScroll();
    }

    public componentDidUpdate(preProps: SearchListProps) {
        if (preProps.value !== this.props.value) {
            this.initialize();
        } else if (preProps.type !== this.props.type) {
            this.props.CommonActions.initializeSearch();
        }
    }

    public componentWillUnmount() {
        this.unlistenScroll();
    }

    public render() {
        const { datas, type } = this.props;
        const { onOpen } = this;
        
        return (
            <React.Fragment>
                {
                    type === 'pin' ? (
                        <CommonCardList
                            pins={datas}
                            onOpen={onOpen}
                            theme="user"
                        /> 
                    ) : (
                        <CommonUserList
                            users={datas}
                        />
                    )
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ common }: StoreState) => ({
    datas: common.search.Data,
    prefetched: common.search.prefetched,
    next: common.search.next,
    loading: common.search.loading,
    value: common.value,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    CommonActions: bindActionCreators(commonCreators, dispatch),
    BaseActions: bindActionCreators(baseCreators, dispatch),
    PinActions: bindActionCreators(pinCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SearchList);