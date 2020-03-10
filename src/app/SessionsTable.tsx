import React, { useCallback, useEffect, useState } from 'react';
import { Table, Dimmer, Loader, Label, Button, Icon } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { RefreshToken } from '../store/auth/types';
import { getAllRefreshTokens, RefreshTokensResponse } from '../api/refresh_tokens';

type SessionsTableProps = {
  refreshToken: RefreshToken,
  loading: boolean,
  setLoading: (loading: boolean) => void,
};

const SessionsTable: React.FC<SessionsTableProps> = ({
  refreshToken,
  loading,
  setLoading
}: SessionsTableProps) => {
  const [refreshTokens, setRefreshTokens] = useState<Array<RefreshTokensResponse>>([]);
  
  const fetchRefreshTokens = useCallback(async () => {
    setLoading(true);
    
    try {
      const refreshTokensResponse = await getAllRefreshTokens();
      
      setRefreshTokens(refreshTokensResponse.data.data.refreshTokens);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading]);
  
  useEffect(() => {
    fetchRefreshTokens();
  }, [fetchRefreshTokens]);
  
  return (
    <Dimmer.Dimmable>
      <Dimmer active={loading}
        inverted
      >
        <Loader />
      </Dimmer>
  
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{i18n.t('Device')}</Table.HeaderCell>
            <Table.HeaderCell>{i18n.t('Expires At')}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          
          {refreshTokens.map(token => (
            <Table.Row key={token.id}>
              <Table.Cell>
                {(refreshToken.id === token.id) && (
                  <Label color='blue'
                    ribbon
                  >
                    {i18n.t('Current session')}
                  </Label>
                )}
  
                {token.device}
              </Table.Cell>
              <Table.Cell>
                {token.expires_at}
              </Table.Cell>
              <Table.Cell>
                <Button icon
                  circular
                  size='small'
                  color='red'
                >
                  <Icon name='trash alternate' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          
        </Table.Body>
  
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>
              <strong>
                {i18n.t('Total')}: {refreshTokens.length}
              </strong>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button icon
                circular
                size='small'
                color='red'
              >
                <Icon name='trash alternate' />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
  
      </Table>
    </Dimmer.Dimmable>
    
  );
};

export default SessionsTable;