import React, { useCallback, useEffect, useState } from 'react';
import { Table, Dimmer, Loader, Label, Button, Icon, Confirm } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { RefreshToken } from '../types/models';
import { boundSoftLogout } from '../store/auth/actions';
import {
  deleteAllRefreshTokens,
  deleteRefreshTokenById,
  getAllRefreshTokens,
} from '../api/refresh_tokens';

type SessionsTableProps = {
  refreshToken: RefreshToken,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  softLogout: typeof boundSoftLogout
};

type ConfirmData = {
  deleteTokenId: number | 'all',
  confirmMessage: string
} | null;

const SessionsTable: React.FC<SessionsTableProps> = ({
  refreshToken,
  loading,
  setLoading,
  softLogout
}: SessionsTableProps) => {
  const [refreshTokens, setRefreshTokens] = useState<Array<RefreshToken>>([]);
  const [confirmData, setConfirmData] = useState<ConfirmData>(null);
  
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
  
  const handleAllSessionsLogout = async () => {
    setConfirmData(null);
    setLoading(true);
  
    await deleteAllRefreshTokens();
  
    setRefreshTokens([]);
    setLoading(false);
  };
  
  const handleSessionLogout = async (id: number) => {
    setConfirmData(null);
    setLoading(true);
  
    await deleteRefreshTokenById(id);
  
    setRefreshTokens(refreshTokens.filter(token => token.id !== id));
    setLoading(false);
  };
  
  const handleConfirm = async () => {
    if (!confirmData) {
      return;
    }
    
    const tokenId = confirmData.deleteTokenId;
    
    if (tokenId === 'all') {
      await handleAllSessionsLogout();
      softLogout();
      
      return;
    }
    
    if (tokenId === refreshToken.id)  {
      await handleSessionLogout(tokenId);
      softLogout();
      
      return;
    }
  
    await handleSessionLogout(tokenId);
  };
  
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
                  onClick={() => setConfirmData({
                    deleteTokenId: token.id,
                    confirmMessage: refreshToken.id === token.id ?
                      i18n.t('Delete current session? You will be logged-out.') :
                      i18n.t('Delete session?')
                  })}
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
                onClick={() => setConfirmData({
                  deleteTokenId: 'all',
                  confirmMessage: i18n.t('Delete all sessions? You will be logged-out.')
                })}
              >
                <Icon name='trash alternate' />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
  
      </Table>
      
      <Confirm open={Boolean(confirmData)}
        content={confirmData?.confirmMessage}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmData(null)}
        confirmButton={<Button color='blue'>{i18n.t('Submit')}</Button>}
        cancelButton={<Button color='red'>{i18n.t('Cancel')}</Button>}
      />
    </Dimmer.Dimmable>
    
  );
};

export default SessionsTable;