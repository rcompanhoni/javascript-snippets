import { renderComponent, expect } from '../test_helper';
import SearchBar from '../../src/containers/search_bar';

describe('SearchBar', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(SearchBar);
    });

    it('has a text input', () => {
        expect(component.find('input')).to.exist;
    });

    it('has a submit button', () => {
        expect(component.find('button')).to.exist;
    });

    describe('entering some text', () => {
        beforeEach(() => {
            component.find('input').simulate('change', 'some repository');
        });

        it('when submitted, clears the input', () => {
            component.simulate('submit')
            expect(component.find('input')).to.have.value('');
        });
    });
});