"""empty message

Revision ID: 1b2bda8b1271
Revises: 7189f1c6fc9d
Create Date: 2021-09-03 21:41:31.246679

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1b2bda8b1271'
down_revision = '7189f1c6fc9d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('blog_post', 'user_id',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('blog_post', 'user_id',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###