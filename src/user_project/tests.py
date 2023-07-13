from django.core.exceptions import ValidationError
from django.test import TestCase
from .models import Speciality, Participant, Projects, TypeParticipant,TypeProject,StatusProject, Complexity, ProjectParticipants
import datetime


class TestTypeProjectModel(TestCase):
    def setUp(self):
        self.first_type_project = TypeProject.objects.create(project_type="Web Dev")
        self.second_type_project = TypeProject.objects.create(project_type="Mobile Dev")

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_type_project.id, 1)
        self.assertNotEqual(self.first_type_project.id, self.second_type_project.id)

    def test_name_is_varchar_and_has_max_length_15(self):
        with self.assertRaises(ValidationError):
            self.first_type_project.project_type= 'T'*16
            self.first_type_project.full_clean()


class TestComplexityModel(TestCase):

    def setUp(self):
        self.first_complexity = Complexity.objects.create(complexity="Easy")
        self.second_complexity = Complexity.objects.create(complexity="Medium")

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_complexity.id, 1)
        self.assertNotEqual(self.first_complexity.id, self.second_complexity)

    def test_name_is_varchar_and_has_max_length_25(self):
        with self.assertRaises(ValidationError):
            self.first_complexity.complexity = "T" * 26
            self.first_complexity.full_clean()



class TestStatusProject(TestCase):
    def setUp(self):
        self.first_status_project = StatusProject.objects.create(status="Start")
        self.second_status_project = StatusProject.objects.create(status="Finish")

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_status_project.id,1)
        self.assertNotEqual(self.first_status_project.id, self.second_status_project.id)

    def test_name_is_varchar_and_has_max_length_20(self):
        with self.assertRaises(ValidationError):
            self.first_status_project.status = 'T'*21
            self.first_status_project.full_clean()


class TestSpeciality(TestCase):
    def setUp(self):
        self.first_Speciality = Speciality.objects.create(title="QA")
        self.second_Speciality = Speciality.objects.create(title="BE")

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_Speciality.id, 1)
        self.assertNotEqual(self.first_Speciality.id, self.second_Speciality.id)

    def test_name_is_varchar_and_has_max_length_8(self):
        with self.assertRaises(ValidationError):
            self.first_Speciality.title = "T"*9
            self.first_Speciality.full_clean()


class TestTypeParticipant(TestCase):
    def setUp(self):
        self.first_TypeParticipant = TypeParticipant.objects.create(title="test1")
        self.second_TypeParticipant = TypeParticipant.objects.create(title="test2")

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_TypeParticipant.id,1)
        self.assertNotEqual(self.first_TypeParticipant.id, self.second_TypeParticipant.id)

    def test_name_is_varchar_and_has_max_length_12(self):
        with self.assertRaises(ValidationError):
            self.first_TypeParticipant.title = 'T'*13
            self.first_TypeParticipant.full_clean()


class TestProject(TestCase):
    def setUp(self):
        self.typeProject = TypeProject.objects.create(project_type="test")
        self.complexity = Complexity.objects.create(complexity='test')
        self.status_project = StatusProject.objects.create(status='start')
        self.first_project = Projects.objects.create(
            title="Test",
            comment="test",
            id_type_project=self.typeProject,
            id_complexity=self.complexity,
            id_status_project=self.status_project,
            start_date_project=datetime.date.today(),
            end_date_project=None,
            address_site="test",
            url = "test_url"
        )
        self.second_project = Projects.objects.create(
            title="Test2",
            comment="test2",
            id_type_project=self.typeProject,
            id_complexity=self.complexity,
            id_status_project=self.status_project,
            start_date_project=datetime.date.today(),
            end_date_project=None,
            address_site="test2",
            url="test_url2"
        )

    def test_id_is_unique_and_auto_increment(self):
        self.assertEqual(self.first_project.id, 1)
        self.assertNotEqual(self.first_project.id, self.second_project.id)

    def test_name_is_varchar_and_has_max_length_50(self):
        with self.assertRaises(ValidationError):
            self.first_project.title = 'T'* 51
            self.first_project.full_clean()

    def test_type_project_id_is_int(self):
        self.assertNotEqual(self.first_project.id_type_project, 'test')
        self.assertNotEqual(self.first_project.id_type_project, datetime.date.today())

    def test_complexity_id_is_int(self):
        self.assertNotEqual(self.first_project.id_complexity, 'test')
        self.assertNotEqual(self.first_project.id_complexity, datetime.date.today())

    def test_status_project_id_is_int(self):
        self.assertNotEqual(self.first_project.id_status_project, 'test')
        self.assertNotEqual(self.first_project.id_status_project, datetime.date.today())

    def test_format_start_date_project(self):
        self.assertEqual(self.first_project.start_date_project, datetime.date.today())

    def test_address_site_is_varchar_and_has_max_length_30(self):
        with self.assertRaises(ValidationError):
            self.first_project.address_site = 'T'* 31
            self.first_project.full_clean()

    def test_url_is_varchar_and_has_max_length_30(self):
        with self.assertRaises(ValidationError):
            self.first_project.url = 'T'* 31
            self.first_project.full_clean()

    def test_comment_is_varchar_and_has_max_length_50(self):
        with self.assertRaises(ValidationError):
            self.first_project.comment = 'T'* 51
            self.first_project.full_clean()


class TestParticipant(TestCase):
    def setUp(self):
        self.speciality = Speciality.objects.create(title="QA")
        self.type_participant = TypeParticipant.objects.create(title="Test")
        self.participant = Participant.objects.create(
            id="123e4567-e89b-12d3-a456-426655440000",
            first_name="Test",
            last_name='Test',
            phone_number='+380000000000',
            email='test@gmail.com',
            account_discord="test#0000",
            account_linkedin="test",
            country='Ukraine',
            stack='Java, Python',
            id_speciality=self.speciality,
            id_type_participant=self.type_participant
        )

    def test_UUID(self):
        self.assertEqual(self.participant.id, "123e4567-e89b-12d3-a456-426655440000")
        with self.assertRaises(ValidationError):
            self.participant.id = "456e789b-c12d-3456-a678-90123456789b"
            self.participant.full_clean()

    def test_first_name_is_varchar_and_has_max_length_20(self):
        with self.assertRaises(ValidationError):
            self.participant.first_name = 'T'* 21
            self.participant.full_clean()

    def test_last_name_is_varchar_and_has_max_length_50(self):
        with self.assertRaises(ValidationError):
            self.participant.last_name = 'T'* 51
            self.participant.full_clean()


    def test_account_discord_is_varchar_and_has_max_length_37(self):
        with self.assertRaises(ValidationError):
            self.participant.account_discord = 'T'* 38
            self.participant.full_clean()

    def test_phone_number_is_varchar_and_has_max_length_13(self):
        with self.assertRaises(ValidationError):
            self.participant.phone_number = 'T'* 14
            self.participant.full_clean()

    def test_country_is_varchar_and_has_max_length_50(self):
        with self.assertRaises(ValidationError):
            self.participant.country = 'T'* 51
            self.participant.full_clean()

    def test_account_linkedin_is_varchar_and_has_max_length_128(self):
        with self.assertRaises(ValidationError):
            self.participant.account_linkedin = 'T'* 129
            self.participant.full_clean()

    def test_email_is_varchar_and_has_max_length_70(self):
        with self.assertRaises(ValidationError):
            self.participant.email = 'T'* 71
            self.participant.full_clean()

    def test_stack_is_varchar_and_has_max_length_300(self):
        with self.assertRaises(ValidationError):
            self.participant.stack = 'T'* 301
            self.participant.full_clean()

    def test_default_experience_is_False(self):
        self.assertNotEqual(self.participant.experience, True)

    def test_speciality_id_is_int(self):
        self.assertNotEqual(self.participant.id_speciality, 'test')
        self.assertNotEqual(self.participant.id_speciality, datetime.date.today())

    def test_type_participant_id_is_int(self):
        self.assertNotEqual(self.participant.id_type_participant, 'test')
        self.assertNotEqual(self.participant.id_type_participant, datetime.date.today())



class TestProjectParticipants(TestCase):
    def setUp(self):
        self.typeProject = TypeProject.objects.create(project_type="test")
        self.complexity = Complexity.objects.create(complexity='test')
        self.status_project = StatusProject.objects.create(status='start')
        self.speciality = Speciality.objects.create(title="QA")
        self.type_participant = TypeParticipant.objects.create(title="Test")
        self.participant1 =Participant.objects.create(
            id="123e4567-e89b-12d3-a456-426655440000",
            first_name="Test",
            last_name='Test',
            phone_number='+380000000000',
            email='test@gmail.com',
            account_discord="test#0000",
            account_linkedin="test",
            country='Ukraine',
            stack='Java, Python',
            id_speciality=self.speciality,
            id_type_participant=self.type_participant
        )
        self.participant2 = Participant.objects.create(
            id="123e4567-e89b-12d3-a456-426655440001",
            first_name="Test",
            last_name='Test',
            phone_number='+380000000000',
            email='test1@gmail.com',
            account_discord="test#0000",
            account_linkedin="test",
            country='Ukraine',
            stack='Java, Python',
            id_speciality=self.speciality,
            id_type_participant=self.type_participant
        )
        self.project = Projects.objects.create(
            title="Test",
            comment="test",
            id_type_project=self.typeProject,
            id_complexity=self.complexity,
            id_status_project=self.status_project,
            start_date_project=datetime.date.today(),
            end_date_project=None,
            address_site="test",
            url = "test_url"
        )
        self.project_participant = ProjectParticipants(project_id=self.project.id, participant_id=self.participant1.id)
        self.project_participant2 = ProjectParticipants(project_id=self.project.id, participant_id=self.participant2.id)

    def test_join_participant_to_project(self):
        self.assertEqual(self.project_participant.project, self.project_participant2.project)
        self.assertNotEqual(self.project_participant.participant.id, self.project_participant2.participant.id)
