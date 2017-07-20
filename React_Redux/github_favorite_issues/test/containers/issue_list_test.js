import { renderComponent, expect } from '../test_helper';
import IssueList from '../../src/containers/issue_list';

describe('IssueList', () => {
    let component;

    beforeEach(() => {
        const state = {
            searchedIssues : {
                repository: "organization/repository",
                issues: [
                    { id: 111, number: 1, selected: false, state: 'open', title: "Some problem with the code 01", created_at: new Date() },
                    { id: 222, number: 2, selected: false, state: 'open', title: "Some problem with the code 02", created_at: new Date() },
                    { id: 333, number: 3, selected: false, state: 'open', title: "Some problem with the code 03", created_at: new Date() }
                ]
            }
        }

        component = renderComponent(IssueList, null, state);
    });

    it('shows a TR for each issue', () => {
        expect(component.find('tr').length).to.equal(3);
    });
});