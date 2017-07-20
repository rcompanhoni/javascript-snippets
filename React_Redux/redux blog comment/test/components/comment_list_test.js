import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
    let component;

    beforeEach(() => {
        const state = { comments: ["Test Comment 01", "Test Comment 02"] };
        component = renderComponent(CommentList, null, state);
    });

    it('shows an LI for each comment', () => {
        expect(component.find('li').length).to.equal(2);
    });

    it('shows each comment that is provided', () => {
        expect(component).to.contain("Test Comment 01");
        expect(component).to.contain("Test Comment 02");
    });
});